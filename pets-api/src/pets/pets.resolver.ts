import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePetProfileInput } from 'src/pet_profile/dto/create-pet-profile.input/create-pet-profile.input';
import { CreatePetInput } from './dto/create-pet.input/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input/update-pet.input';
import { Pet } from './entities/pet.entity/pet.entity';
import { PetsService } from './pets.service';

@Resolver()
export class PetsResolver {
    constructor(
        private readonly petsService: PetsService
    ) {}

    @Query(() => [Pet], {name: 'pets'})
    async findAll() {
        return this.petsService.findAll();
    }

    @Query(() => [Pet], {name: 'pet'})
    async findOne(@Args('id', {type: () => ID}) id: string) {
        return this.petsService.findOne(id);
    }

    @Mutation(()=> Pet, {name: 'createPet'}) 
    async create(
        @Args('createPetInput') createPetInput: CreatePetInput,
        @Args('createPetProfileInput', {nullable: true}) createPetProfileInput: CreatePetProfileInput
    ) {
        return this.petsService.create(createPetInput, createPetProfileInput);
    }

    @Mutation(()=> Pet, {name: 'updatePet'})
    async update(
        @Args('id') id: string,
        @Args('updatePetInput') updatePetInput: UpdatePetInput,
    ) {
        return this.petsService.update(id, updatePetInput)
    }

    @Mutation(()=> Pet, {name: 'removePet'})
    async remove(@Args('id', {type: () => ID}) id: string) {
        return this.petsService.remove(id);
    }
}