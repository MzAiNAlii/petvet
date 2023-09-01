import { IsString } from "class-validator";

export class ChatDto{
    @IsString()
    sender_id: string

    @IsString()
    receiver_id:string

    @IsString()
    message: string
}