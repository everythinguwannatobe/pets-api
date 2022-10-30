import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/pets/entities/pet.entity/pet.entity';
import { PetProfile } from './entities/pet_profile.entity/pet_profile.entity';
import { PetProfileResolver } from './pet_profile.resolver';
import { PetProfileService } from './pet_profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetProfile, Pet])],
  providers: [PetProfileResolver, PetProfileService]
})
export class PetProfileModule {}
