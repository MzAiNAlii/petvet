import { IsString, IsEmail, IsBoolean, IsOptional } from "class-validator"
import {PickType} from '@nestjs/mapped-types'

export class SignupDto{

   
    
    @IsString()
    @IsEmail()
    email: string
   
    @IsString()
    password: string
   
    @IsString()
    fbUserId: string

    @IsBoolean()
    is_Online: boolean
}
export class fbId extends PickType(SignupDto, ['fbUserId']) {}
