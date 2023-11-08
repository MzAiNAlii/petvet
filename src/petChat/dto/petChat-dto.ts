import { IsOptional, IsString } from "class-validator"

export class PetChatDto{

    @IsString()
    @IsOptional()
    petId: string

    messages: Array<{
        content: string;
        role: string;
        time: Date;
    }>
}