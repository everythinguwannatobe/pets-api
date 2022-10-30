import { ObjectType } from "@nestjs/graphql";
import { PetOwner } from "src/pet_owners/entities/pet_owner.entity/petowner.entity";
import { PetProfile } from "src/pet_profile/entities/pet_profile.entity/pet_profile.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Pet {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column()
    type: string;
    
    @Column()
    isHouseTrained: boolean;
    
    @Column()
    breed: string;
    
    @Column()
    instagramUrl: string;

    @Column('uuid', {nullable: true})
    @Index()
    owner_id!: string
  
    @ManyToOne(() => PetOwner, (owner) => owner.pets)
    @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
    owner!: PetOwner

    @Column('uuid', {nullable: true})
    profile_id!: string

    @OneToOne(() => PetProfile, (profile) => profile.pet, {
        cascade: true,
    }) 
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile!: PetProfile
}
