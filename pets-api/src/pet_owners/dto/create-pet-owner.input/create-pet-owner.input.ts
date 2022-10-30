import { InputType } from "@nestjs/graphql";

@InputType()
export class CreatePetOwnerInput {
    firstname: string;

    lastname: string;

    address?: string;

    mobile?: string;

    homePhone?: string;

    email?: string;
}
