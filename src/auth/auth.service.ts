import { BadRequestException, ConsoleLogger, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignupDto } from 'src/user/dto/signup-dto';
import { UserService } from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt'
import * as bcrpt from 'bcrypt'
import { LoginDto } from 'src/user/dto/login-dto';
import { MailService } from 'src/mail/mail.service';
import { ForgotPasswordDto } from 'src/user/dto/forgotpassword';
import axios from 'axios';
import { fbId } from 'src/user/dto/signup-dto';
import * as moment from 'moment';

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

        let currentTime = moment();        
        const  currentExppirationTime :any= currentTime.format('h: mm A');
        let expirationTime: any = moment().add(4, 'minute').format('h: mm A')

        if(!existingUser){
            return {
                message: "Invalid Credentials",
                status: false
            }
        }
        
        const existingUserCheckLockout =  await this.userServices.findEmail(loginDto.email)
        const matchPassword =  bcrpt.compareSync(loginDto.password,existingUser.password)
        if(!matchPassword){
            if(existingUserCheckLockout){
                existingUserCheckLockout.lockoutCountr++;
                await existingUserCheckLockout.save();
            }
            if(existingUserCheckLockout && existingUserCheckLockout.isLock == true){
                await this.userServices.updateUserLockoutCurrentTime(existingUserCheckLockout._id, currentExppirationTime)
                const updateCurrentTime = await this.userServices.findId(existingUserCheckLockout._id)
                return {
                    message: `Your account has been temporarily locked due to multiple failed login attempts. Please try again`,
                    currentTime: updateCurrentTime.currentTime,
                    expireTime: existingUserCheckLockout.expireTime
                }

            }
            if(existingUserCheckLockout && existingUserCheckLockout.lockoutCountr ==5 && existingUserCheckLockout.isLock == false){
                await this.userServices.updateUserLockoutCount(existingUserCheckLockout._id, currentExppirationTime, expirationTime)
                const updateData = await this.userServices.findId(existingUserCheckLockout._id)
                return {
                    message: `Your account has been temporarily locked due to multiple failed login attempts. Please try again`,
                    currentTime: updateData.currentTime,
                    expireTime: updateData.expireTime
                }
            }

            if(!existingUserCheckLockout){
                const addNewLockout = await this.userServices.createlockout(loginDto.email)
                
                throw new ForbiddenException("Invalid Credentials")
            }
            
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
    async forgotPassword(id: string, forgotpasswordDto: ForgotPasswordDto){
        const existingUser = await this.mailService.findById(id)
        const existingUserEmail = await this.userServices.findByEmail(existingUser.email)

        if(forgotpasswordDto.newPassword != forgotpasswordDto.confirmPassword){
            throw new ForbiddenException("Password NOt Match")
        }


        forgotpasswordDto.newPassword = await bcrpt.hash(forgotpasswordDto.newPassword,8)

        const updatePassword = await this.userServices.findOneAndUpdate(existingUserEmail._id,forgotpasswordDto.newPassword)

        return {
            message: "Password Reset Successfully",
            status: true
        }
        
    }

    async googleLogin(googleAccessToken: string){
        try {
            if (!googleAccessToken) {
                throw new BadRequestException("Access token is missing from the request body")
                // return res.status(400).json({ error: 'Access token is missing from the request body' });
              }
              const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleAccessToken}`;
              
              const response = await axios.get(url)
              const email = response.data.email

              const existingUser = await this.userServices.findByEmail(email)
              if(existingUser){
                const access_token = this.jwtService.sign({
                    id: existingUser._id,
                    email: existingUser.email
                })

                return {
                    message: "Login Successfully",
                    data: {
                        user: existingUser,
                        token: access_token
                    }
                }
              }

              const newUser = this.userServices.createUser(email)

              const access_token = this.jwtService.sign({
                id: existingUser._id,
                email: existingUser.email
            })

            return {
                message: "Login Successfully",
                data: {
                    user: existingUser,
                    token: access_token
                }
            }



        } catch (error) {
            throw new InternalServerErrorException("Internal Server Error")
            
        }
    }

    async facebookLogin(fbUserId: fbId){
        
        try {
            const existingUser = await this.userServices.findFbUser(fbUserId)
            console.log("user",existingUser)
            if(existingUser){
                const accessToken = this.jwtService.sign({
                  id: existingUser.fbUserId
                })
        
              return {
                  message: "Login Successfully",
                  data: {
                      user: existingUser,
                      token: accessToken
                  }
              }
            }

            const newUser = await this.userServices.createFbUser(fbUserId)

              const access_token = this.jwtService.sign({
                id: newUser._id,
                fbUserId: newUser.fbUserId
                
            })

            return {
                message: "Login Successfully",
                data: {
                    user: newUser,
                    token: access_token
                }
            }
            
        } catch (error) {
            console.log("errer", error)
            throw new InternalServerErrorException()

            
        }
    }
}
