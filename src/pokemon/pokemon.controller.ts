import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { UpdatePokemonDto, CreatePokemonDto } from './dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
@Controller('pokemon')
export class PokemonController {
  constructor (private readonly pokemonService: PokemonService) {}

  @Post()
  // @HttpCode(HttpStatus.CREATED) este decorador nos ayuda si queremos especificar el status code
  async create (@Body() createPokemonDto: CreatePokemonDto) {
    return await this.pokemonService.create(createPokemonDto);
  }

  @Get()
  async findAll ( @Query() paginationDto: PaginationDto ) {
    return await this.pokemonService.findAll( paginationDto );
  }

  @Get(':term')
  async findOne (@Param('term') term: string) {
    return await this.pokemonService.findOne( term );
  }

  @Patch(':term')
  async update (@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return await this.pokemonService.update( term, updatePokemonDto);
  }

  @Delete(':id')
  async remove (@Param('id', ParseMongoIdPipe) id: string) {
    return await this.pokemonService.remove( id );
  }
}
