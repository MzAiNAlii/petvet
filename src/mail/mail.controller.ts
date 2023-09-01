import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { MailDto } from './dto/mail-dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailSerivce : MailService){}

    @Post('createEmail')
    @HttpCode(200)
    createEmail(@Body() mailDto : MailDto){
        //const {email} = mailDto
        return this.mailSerivce.sendEmail(mailDto)
    }

    @Post("verifyEmail/:id")
    @HttpCode(200)
    emailVerification(@Param('id') id:string  ,@Body()  mailDto: MailDto ){
       
        return this.mailSerivce.emailVerification(id, mailDto )

    }

    @Get("otpResend/:id")
    @HttpCode(200)
    otpResend(@Param('id') id:string  ){
       
        return this.mailSerivce.resendOtp(id)
    }

    @Post("emailForgotPassword")
    @HttpCode(200)
    emailForgotPassword(@Body() mailDto:MailDto){
        return this.mailSerivce.emailForgotPassword(mailDto)
    }

    @Post("forgotPassword/:id")
    @HttpCode(200)
    forgotPassword(@Param('id') id: string, @Body() body){
        const {newPassword, confirmPassword}=body;
        return this.mailSerivce.forgotPassword(id, newPassword, confirmPassword)
    }



}
