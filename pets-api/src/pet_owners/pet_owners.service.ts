import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Pet } from 'src/pets/entities/pet.entity/pet.entity';
import { Repository } from 'typeorm';
import { CreatePetOwnerInput } from './dto/create-pet-owner.input/create-pet-owner.input';
import { UpdatePetOwnerInput } from './dto/update-pet-owner.input/update-pet-owner.input';
import { PetOwner } from './entities/pet_owner.entity/petowner.entity';
import { AppDataSource } from 'src/server';

@Injectable()
export class PetOwnersService {
    async findAll() {
        const users = await AppDataSource
        .getRepository(PetOwner)
        .createQueryBuilder("po")
        .leftJoinAndSelect('po.pets', 'pet')
        .getMany()

        return users
      }
      
    async findOne(id: string) {
      const petOwner_find = await AppDataSource
      .getRepository(PetOwner)
      .createQueryBuilder("po")
      .leftJoinAndSelect('po.pets', 'pet')
      .where("po.id = :id", { id: id })
      .getOne()

      return petOwner_find
    }
      
    async create(createPetOwnerInput: CreatePetOwnerInput) {

      const petOnwer_create = AppDataSource
      .getRepository(PetOwner)
      .create(createPetOwnerInput)

      return AppDataSource.getRepository(PetOwner).save(petOnwer_create)
    }

    async update(id: string, updatePetOwnerInput: UpdatePetOwnerInput) {
      const petowner_update = await AppDataSource
      .getRepository(PetOwner)
      .preload({
        id, 
        ...updatePetOwnerInput
      })

      if (!petowner_update) {
        throw new UserInputError(`PetOwner #${id} does not exist in the database`);
      }
      return AppDataSource.getRepository(PetOwner).save(petowner_update)
    }

    async remove(id: string) {
      const petOwner_find = await AppDataSource
        .getRepository(PetOwner)
        .createQueryBuilder("po")
        .where("po.id = :id", { id: id })
        .getOne()

      if (!petOwner_find) {
        throw new UserInputError(`PetOwner #${id} does not exist in the database`);
      }

      await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(PetOwner)
        .where("id = :id", { id: id })
        .execute()
      
    return petOwner_find
  }
}