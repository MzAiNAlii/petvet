import { Controller , Get, UseGuards, Post, Body, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/user/dto/signup-dto';
import { LoginDto } from 'src/user/dto/login-dto';


@Controller()
export class AuthController {
    // constructor(private readonly authServices : AuthService){}

    // @Post("signup")
    // signup(@Body()signupDto :SignupDto){
    //     return this.authServices.signup(signupDto)
    // }
    // @Post("login")
    // @HttpCode(200)
    // login(@Body()loginDto :LoginDto){
    //     return this.authServices.login(loginDto)
    // }
    
    // @Get("findAll")
    // @HttpCode(200)
    // findAllUser(){
    //     return this.authServices.findAllUser()
    // }
    
}
