import { InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { CreatePetProfileInput } from "src/pet_profile/dto/create-pet-profile.input/create-pet-profile.input";

@InputType()
export class CreatePetInput {
    @MinLength(3)
    name: string;
    type: string;
    isHouseTrained: boolean;
    breed: string;
    instagramUrl: string;
    owner_id?: string;
}
