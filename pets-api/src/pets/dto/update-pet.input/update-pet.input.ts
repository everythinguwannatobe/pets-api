import { InputType, PartialType } from "@nestjs/graphql";
import { CreatePetInput } from "../create-pet.input/create-pet.input";

@InputType()
export class UpdatePetInput extends PartialType(CreatePetInput){

}