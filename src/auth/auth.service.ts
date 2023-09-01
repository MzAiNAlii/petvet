import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from 'src/user/dto/signup-dto';
import { UserService } from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt'
import * as bcrpt from 'bcrypt'
import { LoginDto } from 'src/user/dto/login-dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
    constructor(private readonly userServices : UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
        ){}

    async signup(singupDto: SignupDto){

        const VerifyExistingUser = await this.mailService.findByEmail(singupDto.email)
        if(!VerifyExistingUser){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)

        }

        const existingUser = await this.userServices.findByEmail(singupDto.email)
        if(existingUser){
    
            throw new HttpException('User Already Exists', HttpStatus.CONFLICT)
        }
        singupDto.password = bcrpt.hashSync(singupDto.password, 8)

        const newUser = await this.userServices.createUser(singupDto)
        
        
        return {
            
            message: "signup successfull",
            data: newUser,
            //status: new HttpException('ok', HttpStatus.OK)
           
        }
    }

    async login(loginDto : LoginDto){
        const existingUser = await this.userServices.findByEmail(loginDto.email)

        if(!existingUser){
            return {
                message: "Invalid Credentials",
                status: false
            }
        }

        const matchPassword =  bcrpt.compareSync(loginDto.password,existingUser.password)
        //console.log(matchPassword)
        if(!matchPassword){
            return {
                message: "Invalid Credentials",
                status: false
            }

        }
        const accessToken =  this.jwtService.sign({
            id: existingUser._id,
            email: existingUser.email,
        })

        return {
            message: "login Successfully",
            data: existingUser,
            token: accessToken
        
        }
    }

    async findAllUser(){
        const allUsers = await this.userServices.findAll()

        return {
            message : "All User Find Successfully",
            data: allUsers
        }
    }
}
