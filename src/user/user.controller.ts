import { Body, Controller, Post, HttpCode, Get, Param } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';
import { ForgotPasswordDto } from './dto/forgotpassword';
import { fbId } from './dto/signup-dto';

@Controller('user')
export class UserController {
    constructor(private  authServices: AuthService){}
    @Post("signup")
    signup(@Body()signupDto :SignupDto){
        return this.authServices.signup(signupDto)
    }
    @Post("login")
    @HttpCode(200)
    login(@Body()loginDto :LoginDto){
        return this.authServices.login(loginDto)
    }
    @Get("findAll")
    @HttpCode(200)
    findAllUser(){
        return this.authServices.findAllUser()
    }
    @Post("resetPassword/:id")
    @HttpCode(200)
    resetPassword(@Param('id') id: string, @Body() forgotPasswordDto: ForgotPasswordDto){
        return this.authServices.forgotPassword(id, forgotPasswordDto)
    
    }

    @Post("googleLogin")
    @HttpCode(200)
    googleLogin(@Body() googleAccessToken: string){
        return this.authServices.googleLogin(googleAccessToken)
    }
    @Post("facebookLogin")
    @HttpCode(200)
    facebookLogibn(@Body() fbUserId: fbId){
        return this.authServices.facebookLogin(fbUserId)
    }
}
