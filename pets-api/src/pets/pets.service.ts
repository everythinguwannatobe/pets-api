import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input/update-pet.input';
import { Pet } from './entities/pet.entity/pet.entity';
import { AppDataSource } from 'src/server';
import { CreatePetProfileInput } from 'src/pet_profile/dto/create-pet-profile.input/create-pet-profile.input';
import { PetProfile } from 'src/pet_profile/entities/pet_profile.entity/pet_profile.entity';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet)
        private readonly petsRepository: Repository<Pet>
    ) {}

    async findAll() {
        return await AppDataSource.getRepository(Pet).createQueryBuilder("pet").getMany()
      }
      
    async findOne(id: string) {
      const pet_find = await AppDataSource
      .getRepository(Pet)
      .createQueryBuilder("pet")
      .where("pet.id = :id", { id: id })
      .getOne()

      if (!pet_find) {
          throw new UserInputError(`Pet #${id} does not exist in the database`);
      }
      return pet_find;
    }
    
    async create(createPetInput: CreatePetInput, createPetProfileInput?: CreatePetProfileInput) {
      if (!createPetProfileInput) {
        console.log("regular")
        const pet_create = AppDataSource
        .getRepository(Pet)
        .create(createPetInput)

        return AppDataSource.getRepository(Pet).save(pet_create);
      }
      else {
        const petprofile_create = AppDataSource.getRepository(PetProfile).create(createPetProfileInput);

        console.log("petprofile_create", petprofile_create)
        const pet_create = AppDataSource
        .getRepository(Pet)
        .create({
          ...createPetInput,
          profile: petprofile_create
        });

        console.log("return")
        return AppDataSource.getRepository(Pet).save(pet_create);
      }

      
    }

    async update(id: string, updatePetInput: UpdatePetInput) {
      const pet_update = await AppDataSource
      .getRepository(Pet)
      .preload({
        id, 
        ...updatePetInput
      })

      if (!pet_update) {
        throw new UserInputError(`Pet #${id} does not exist in the database`);
      }
      return AppDataSource.getRepository(Pet).save(pet_update)
    }

    async remove(id: string) {
      const pet_find = await AppDataSource
      .getRepository(Pet)
      .createQueryBuilder("pet")
      .where("pet.id = :id", { id: id })
      .getOne()

      if (!pet_find) {
        throw new UserInputError(`Pet #${id} does not exist in the database`);
      }

      await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(Pet)
        .where("id = :id", { id: id })
        .execute()
      
      return pet_find
    }
}
