import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PetModule } from './pet/pet.module';
import { MailModule } from './mail/mail.module';
import { ChatModule } from './chat/chat.module';


@Module({
  
  imports: [UserModule, AuthModule,
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory : async (configService: ConfigService)=>({
      uri: configService.get<string>("MONGO_URI")

    })
  }),
  ConfigModule.forRoot({
    isGlobal: true
  }),
  PetModule,
  MailModule,
  ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
