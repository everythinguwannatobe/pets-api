import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePetProfileInput } from './dto/create-pet-profile.input/create-pet-profile.input';
import { UpdatePetProfileInput } from './dto/update-pet-profile.input/update-pet-profile.input';
import { PetProfile } from './entities/pet_profile.entity/pet_profile.entity';
import { PetProfileService } from './pet_profile.service';

@Resolver()
export class PetProfileResolver {
    constructor(
        private readonly petProfileService: PetProfileService
    ) {}

    @Query(() => [PetProfile], {name: 'pets'})
    async findAll() {
        return this.petProfileService.findAll();
    }

    @Query(() => PetProfile, {name: 'pet'})
    async findOne(@Args('id', {type: () => ID}) id: string) {
        return this.petProfileService.findOne(id);
    }

    @Mutation(()=> PetProfile, {name: 'createPetProfile'}) 
    async create(@Args('createPetProfileInput') createPetProfileInput: CreatePetProfileInput) {
        return this.petProfileService.create(createPetProfileInput);
    }

    @Mutation(()=> PetProfile, {name: 'updatePetProfile'})
    async update(
        @Args('id') id: string,
        @Args('updatePetInput') updatePetProfileInput: UpdatePetProfileInput,
    ) {
        return this.petProfileService.update(id, updatePetProfileInput)
    }

    @Mutation(()=> PetProfile, {name: 'removePetProfile'})
    async remove(@Args('id', {type: () => ID}) id: string) {
        return this.petProfileService.remove(id);
    }
}
