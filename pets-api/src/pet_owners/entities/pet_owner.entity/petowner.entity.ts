import { ObjectType } from "@nestjs/graphql";
import { Pet } from "src/pets/entities/pet.entity/pet.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("pet_owner")
@ObjectType()
export class PetOwner {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({nullable: true})
    address: string;

    @Column({nullable: true})
    mobile: string;

    @Column({nullable: true})
    homePhone: string;

    @Column({nullable: true})
    email: string;

    @OneToMany(() => Pet, (pet) => pet.owner)
    pets!: Pet[]
}