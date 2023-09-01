import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { chatSchema } from './entities/chat-entity';
import { myGateway } from './chatGateway';
import { AuthModule } from 'src/auth/auth.module';
import { AccessTokenGuard } from 'src/auth/guard/accessToken-guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule,UserModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService : ConfigService) =>{
        return{
          secret: configService.get<string>("SECRET_KEY"),
          signOptions:{expiresIn: '30d'}
          
        }
      }
    }),
    MongooseModule.forFeature([{
    name: "Nestchat",
    schema: chatSchema
  }])],
  controllers: [ChatController],
  providers: [ChatService, myGateway, AccessTokenGuard ]
})
export class ChatModule {}
