import { IsString } from "class-validator";

export class ForgotPasswordDto{
    @IsString()
    newPassword: string

    @IsString()
    confirmPassword: string
}