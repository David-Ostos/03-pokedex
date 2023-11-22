import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { type CreatePokemonDto, type UpdatePokemonDto } from './dto';
import { type PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  private readonly defaultLimit: number;

  constructor (

    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService

  ) {
    this.defaultLimit = configService.getOrThrow<number>('defaultLimit');
    console.log({ defaultLimit: configService.getOrThrow<number>('defaultLimit') });
  }

  async create (createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name = createPokemonDto.name.toLowerCase().trim();

    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );

      return pokemon;

    } catch (error) {
      this.handleExceptions(error);

      console.log(error);
      throw new InternalServerErrorException(` Cant's create Pokemon - ${error}`);
    }
  }

  async findAll ( PaginationDto: PaginationDto ) {

    const {
      limit = this.defaultLimit,
      offset = 0
    } = PaginationDto;

    return await this.pokemonModel.find()
      .limit( limit )
      .skip( offset )
      .sort({
        no: 1
      })
      .select('-__v');
  }

  async findOne (term: string) {

    let pokemon: Pokemon;

    // no
    if ( !isNaN(+term) ) {
      pokemon = await this.pokemonModel.findOne({ no: term }).select('-__v');
    }

    // mongoID
    if ( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term ).select('-__v');
    }

    // Name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() }).select('-__v');
    }

    // Not Found
    if ( !pokemon ) {
      throw new NotFoundException(`Pokemon with id, name, or no '${ term }' not found`);
    }

    return pokemon;
  }

  async update (term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne( term );
    if ( updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase().trim();
    }

    try {
      await pokemon.updateOne( updatePokemonDto, { new: true } );

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove (id: string) {
    // const pokemon = await this.findOne( id );
    // await pokemon.deleteOne();
    // await this.pokemonModel.findByIdAndDelete( id );

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if ( deletedCount === 0 ) {
      throw new BadRequestException(`Pokemon with id "${ id }" not found.`);
    }

    return {
      message: `Pokemon with id ${id} was removed`
    };
  }

  private handleExceptions ( error: any) {
    if ( error.code === 11000 ) {
      throw new BadRequestException(`The pokemon with the ${JSON.stringify( error.keyValue )} exists in db`);
    } else {
      throw new InternalServerErrorException( error );
    }
  }
}
