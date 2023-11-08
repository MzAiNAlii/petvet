import { IsBoolean, IsNumber, IsString} from "class-validator";

export class LockoutDto{

    @IsString()
    email: string

    @IsString()
    requestType: string

    @IsNumber()
    lockoutCount: number

    @IsString()
    currectTime: string

    @IsString()
    expireTime: string

    @IsBoolean()
    isLock: boolean
}