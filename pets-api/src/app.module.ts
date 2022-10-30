import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Pet } from './pets/entities/pet.entity/pet.entity';
import { PetsModule } from './pets/pets.module';
import { PetOwner } from './pet_owners/entities/pet_owner.entity/petowner.entity';
import { PetOwnersModule } from './pet_owners/pet_owners.module';
import { PetProfileModule } from './pet_profile/pet_profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      //disable if prod.
      synchronize: true,
    }), 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }), PetsModule, PetOwnersModule, PetProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
