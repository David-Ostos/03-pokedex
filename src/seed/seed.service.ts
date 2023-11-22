/* eslint-disable @typescript-eslint/no-misused-promises */
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { type PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor (
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
  ) {}

  async excecuteSeed () {

    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: Array<{ name: string, no: number }> = [];

    data.results.forEach( async ({ name, url }) => {

      const segments = url.split('/');

      const no: number = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no });
    });
    try {
      await this.pokemonModel.insertMany(pokemonToInsert);

    } catch (error) {
      if ( error.code === 11000 ) {
        throw new BadRequestException(`The pokemon with the ${JSON.stringify( error.keyValue )} exists in db`);
      } else {
        throw new InternalServerErrorException( error );
      }
    }

    return 'Seed execute';
  }
}



/*

    const insertPromisesArray: any = [];

    data.results.forEach( async ({ name, url }) => {

      const segments = url.split('/');

      const no: number = +segments[segments.length - 2];

      // const pokemon = await this.pokemonModel.create({ name, no });
      // return await this.pokemonService.create({ name, no });
      insertPromisesArray.push(
        this.pokemonModel.create({ name, no })
      );
    });
    try {
      await Promise.all( insertPromisesArray );

    } catch (error) {
      if ( error.code === 11000 ) {
        throw new BadRequestException(`The pokemon with the ${JSON.stringify( error.keyValue )} exists in db`);
      } else {
        throw new InternalServerErrorException( error );
      }
    }

*/
