import { InputType } from "@nestjs/graphql";

@InputType()
export class CreatePetProfileInput {
    microchip: boolean;

    vaccinated: boolean;

    pet_id?: string;
}
