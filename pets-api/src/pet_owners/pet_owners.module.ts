import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/pets/entities/pet.entity/pet.entity';
import { PetOwner } from './entities/pet_owner.entity/petowner.entity';
import { PetOwnersResolver } from './pet_owners.resolver';
import { PetOwnersService } from './pet_owners.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetOwner, Pet])],
  providers: [PetOwnersResolver, PetOwnersService]
})
export class PetOwnersModule {}