import { InputType, PartialType } from "@nestjs/graphql";
import { CreatePetOwnerInput } from "../create-pet-owner.input/create-pet-owner.input";

@InputType()
export class UpdatePetOwnerInput extends PartialType(CreatePetOwnerInput) {}
