import { IsString } from "class-validator";

export class PetDto{
    @IsString()
    id: string

    @IsString()
    petImage: string

    @IsString()
    petName: string

    @IsString()
    petAge: string

    @IsString()
    petType: string

    @IsString()
    breed: string
}