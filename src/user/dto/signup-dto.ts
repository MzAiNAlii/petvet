import { IsString, IsEmail, IsBoolean } from "class-validator"

export class SignupDto{

    @IsString()
    userNmae: string
    
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsBoolean()
    is_Online: boolean
}