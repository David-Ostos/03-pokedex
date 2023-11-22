"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonController = void 0;
const common_1 = require("@nestjs/common");
const pokemon_service_1 = require("./pokemon.service");
const dto_1 = require("./dto");
const parse_mongo_id_pipe_1 = require("../common/pipes/parse-mongo-id/parse-mongo-id.pipe");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let PokemonController = class PokemonController {
    constructor(pokemonService) {
        this.pokemonService = pokemonService;
    }
    async create(createPokemonDto) {
        return await this.pokemonService.create(createPokemonDto);
    }
    async findAll(paginationDto) {
        return await this.pokemonService.findAll(paginationDto);
    }
    async findOne(term) {
        return await this.pokemonService.findOne(term);
    }
    async update(term, updatePokemonDto) {
        return await this.pokemonService.update(term, updatePokemonDto);
    }
    async remove(id) {
        return await this.pokemonService.remove(id);
    }
};
exports.PokemonController = PokemonController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePokemonDto]),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':term'),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':term'),
    __param(0, (0, common_1.Param)('term')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePokemonDto]),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_mongo_id_pipe_1.ParseMongoIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "remove", null);
exports.PokemonController = PokemonController = __decorate([
    (0, common_1.Controller)('pokemon'),
    __metadata("design:paramtypes", [pokemon_service_1.PokemonService])
], PokemonController);
//# sourceMappingURL=pokemon.controller.js.map