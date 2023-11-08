import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { ConfigService } from '@nestjs/config';
import { otpRouter } from 'src/util/otpGenerate';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailDocumnet } from './entities/mail-entity';
import { MailDto } from './dto/mail-dto';
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/user/user.service';

@Injectable()
export class MailService {
constructor (
        @InjectModel('NestMail') private readonly mailModel : Model<MailDocumnet>,
        private readonly userService: UserService,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
        ){}

    async sendEmail( mailDto: MailDto){
        const {email,...rest} = mailDto
      
        const existingUser = await this.mailModel.findOne({email})

        const deleteExistingUser = await this.mailModel.deleteOne({email})

        const isOtp = otpRouter()
        
         this.mailerService.sendMail({
            from: this.configService.get<string>("EMAIL_HOST_USER"),
            to:email,
            subject:"For Email Verification",
            text: `Your OTP is ${isOtp.userotp}`
        })
       
        const otpUserData =  new this.mailModel({
            email,
            UserOtp: isOtp.userotp,
            expire: isOtp.expirationTime
        })
        otpUserData.save()

        return {
            message: "OTP send Successfully",
            data:{
                userId: otpUserData._id,
                userEmail: otpUserData.email
            } 
        }
    }

    async emailVerification(id: string, mailDto: MailDto){
       const {otp,...rest}= mailDto
       const d = {...rest, userOtp:otp}
        console.log(id);
        console.log(d)
    
    const verifyOtp = await this.mailModel.findById({
        _id: id

    })
        
        let currentTime = new Date();
        let expirationTime = currentTime.toTimeString().slice(0, 8)
        

        if(!verifyOtp.email){
           throw new HttpException("Not Found", HttpStatus.NOT_FOUND) 
        }
        if(verifyOtp.UserOtp !== otp){
           throw new HttpException("Invalid OTP", HttpStatus.BAD_REQUEST)
          
        }
        if(verifyOtp.expire <= expirationTime){
            throw new HttpException( "Your OTP is Expired", HttpStatus.UNAUTHORIZED)
        }
        return {
            message: "Verification Succssfull",
            status: true
        }

    }

    async resendOtp(id: string){

        const existingUser = await this.mailModel.findById({
            _id: id
        })
        

        const isOtp = otpRouter()

        this.mailerService.sendMail({
            from: this.configService.get<string>("EMAIL_HOST_USER"),
            to:existingUser.email,
            subject:"For Email Verification",
            text: `Your OTP is ${isOtp.userotp}`
        })

        const updateOtp = await this.mailModel.findOneAndUpdate(existingUser._id,{
            $set:{
                UserOtp: isOtp.userotp,
                expire: isOtp.expirationTime
            }
        },{
            new: true
        })

        const updateData= await this.mailModel.findOne(existingUser._id)

        return {
            message: "OTP Resend Successfully",
            data:{
                userId: updateData._id,
                userEail: existingUser._id
            }
        }

    }

    async emailForgotPassword(mailDto: MailDto){
        const {email,...rest} = mailDto;
        
        const isOtp = otpRouter()
       
         this.mailerService.sendMail({
            from: this.configService.get<string>("EMAIL_HOST_USER"),
            to:email,
            subject:"For Email Verification",
            text: `Your OTP is ${isOtp.userotp}`
        })
        
       
        const otpUserData =  new this.mailModel({
            email,
            UserOtp: isOtp.userotp,
            expire: isOtp.expirationTime
        })
        otpUserData.save()

        return {
            message: "OTP send Successfully",
            data:{
                userId: otpUserData._id,
                userEail: otpUserData.email
            } 
        }
    }

    async forgotPassword(id:string, newPassword: string, confirmPassword: string){
        const user = await this.mailModel.findById({
            _id: id
        })
        

        const existingUser = await this.userService.findByEmail(user.email)

        if(!existingUser){
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND) 
        }

        if(user.email !== existingUser.email){
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        }

        const password = newPassword
        
     
        
        if(newPassword != confirmPassword){
            throw new HttpException("Password Not Match", HttpStatus.FORBIDDEN)
        }

        const hashPassword = bcrypt.hashSync(password,8)

        const updatePassword = await this.userService.findOneAndUpdate(existingUser._id,hashPassword)

        return {
            message: "Password Reset Successfully",
            status: true
        }

    }

    findByEmail(email: string){
        return this.mailModel.findOne({email})
    }
    findById(id: string){
        return this.mailModel.findById({_id: id})
    }
}
