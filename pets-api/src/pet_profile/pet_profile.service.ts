import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { AppDataSource } from 'src/server';
import { CreatePetProfileInput } from './dto/create-pet-profile.input/create-pet-profile.input';
import { UpdatePetProfileInput } from './dto/update-pet-profile.input/update-pet-profile.input';
import { PetProfile } from './entities/pet_profile.entity/pet_profile.entity';

@Injectable()
export class PetProfileService {
    async findAll() {
        return await AppDataSource.getRepository(PetProfile).createQueryBuilder("petprofile").getMany();
      }

    async findOne(id: string) {
        const petprofile_find = await AppDataSource
        .getRepository(PetProfile)
        .createQueryBuilder("petprofile")
        .where("petprofile.id = :id", { id: id })
        .getOne()
  
        if (!petprofile_find) {
            throw new UserInputError(`Pet #${id} does not exist in the database`);
        }
        return petprofile_find;
    }

    async create(createPetProfileInput: CreatePetProfileInput) {
        const pet_create = AppDataSource
        .getRepository(PetProfile)
        .create(createPetProfileInput)
  
        return AppDataSource.getRepository(PetProfile).save(pet_create)
    }

    async update(id: string, updatePetProfileInput: UpdatePetProfileInput) {
        const petprofile_update = await AppDataSource
        .getRepository(PetProfile)
        .preload({
          id, 
          ...updatePetProfileInput
        })
  
        if (!petprofile_update) {
          throw new UserInputError(`PetProfile #${id} does not exist in the database`);
        }
        return AppDataSource.getRepository(PetProfile).save(petprofile_update)
    }

    async remove(id: string) {
        const petprofile_find = await AppDataSource
        .getRepository(PetProfile)
        .createQueryBuilder("petprofile")
        .where("petprofile.id = :id", { id: id })
        .getOne()
  
        if (!petprofile_find) {
          throw new UserInputError(`PetProfile #${id} does not exist in the database`);
        }
  
        await AppDataSource
          .createQueryBuilder()
          .delete()
          .from(PetProfile)
          .where("id = :id", { id: id })
          .execute()
        
        return petprofile_find
    }
}
