import { IsEmail, IsString } from "class-validator";

export class MailDto{
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    otp: string

    @IsString()
    expire: string


}