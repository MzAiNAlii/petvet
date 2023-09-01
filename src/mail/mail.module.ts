import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mailOtpSchema } from './entities/mail-entity';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [UserModule,MailerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory:  (configService : ConfigService)=>({
        transport:{
          service: configService.get<string>("EMAIL_HOST_SERVICE"),          
          secure: false,
          auth:{
            user: configService.get<string>("EMAIL_HOST_USER"),
            pass: configService.get<string>("EMAIL_HOST_PASSWORD")
          },
          tls:{
            rejectUnauthorized: false
          }
      }
    })
    
    }),
  MongooseModule.forFeature([{
    name: "NestMail",
    schema: mailOtpSchema
  }])

],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService]
})
export class MailModule {}
