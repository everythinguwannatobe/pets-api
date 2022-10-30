import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePetOwnerInput } from './dto/create-pet-owner.input/create-pet-owner.input';
import { UpdatePetOwnerInput } from './dto/update-pet-owner.input/update-pet-owner.input';
import { PetOwner } from './entities/pet_owner.entity/petowner.entity';
import { PetOwnersService } from './pet_owners.service';

@Resolver()
export class PetOwnersResolver {
    constructor(
        private readonly petOwnersService: PetOwnersService
    ) {}

    @Query(()=> [PetOwner], {name: 'petOwners'})
    async findAll() {
        return this.petOwnersService.findAll()
    }

    @Query(()=> PetOwner, {name: 'petOwner'})
    async FindOne(@Args('id', {type: () => ID}) id: string) {
        return this.petOwnersService.findOne(id)
    }

    @Mutation(()=> PetOwner, {name: 'createPetOwner'})
    async create(@Args('createPetOwnerInput') createPetOwnerInput: CreatePetOwnerInput) {
        return this.petOwnersService.create(createPetOwnerInput)
    }

    @Mutation(()=> PetOwner, {name: 'updatePetOwner'})
    async update(
        @Args('id') id: string,
        @Args('updatePetOwnerInput') updatePetOwnerInput: UpdatePetOwnerInput
    ) {
        return this.petOwnersService.update(id, updatePetOwnerInput)
    }

    @Mutation(()=> PetOwner, {name: 'removePetOwner'})
    async remove(
        @Args('id') id: string
    ) {
        return this.petOwnersService.remove(id)
    }
}
