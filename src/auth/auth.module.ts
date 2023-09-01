import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from './strategy/AccessTokenStrategy';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [UserModule, MailModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async(configService : ConfigService) =>{
      return{
        secret: configService.get<string>("SECRET_KEY"),
        signOptions:{expiresIn: '30d'}
        
      }
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy],
  exports:[AccessTokenStrategy]
})
export class AuthModule {}
