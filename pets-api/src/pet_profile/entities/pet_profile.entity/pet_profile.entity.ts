import { ObjectType } from "@nestjs/graphql";
import { Pet } from "src/pets/entities/pet.entity/pet.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("pet_profile")
@ObjectType()
export class PetProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    microchip: boolean;

    @Column()
    vaccinated: boolean;

    @Column('uuid', {nullable: true})
    pet_id!: string


    @OneToOne(() => Pet, (pet) => pet.profile) 
    pet!: Pet
}
