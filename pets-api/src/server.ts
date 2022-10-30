import { DataSource } from "typeorm"
import { Pet } from "./pets/entities/pet.entity/pet.entity"
import { PetOwner } from "./pet_owners/entities/pet_owner.entity/petowner.entity"
import { PetProfile } from "./pet_profile/entities/pet_profile.entity/pet_profile.entity"

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    //disable if prod.
    entities: [Pet, PetOwner, PetProfile],
    synchronize: true,
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })