import { InputType, PartialType } from "@nestjs/graphql";
import { CreatePetProfileInput } from "../create-pet-profile.input/create-pet-profile.input";

@InputType()
export class UpdatePetProfileInput extends PartialType(CreatePetProfileInput) {}
