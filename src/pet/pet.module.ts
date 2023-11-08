import { Module, forwardRef } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from './entities/pets-entity';
import { AuthModule } from 'src/auth/auth.module';
import { AccessTokenStrategy } from 'src/auth/strategy/AccessTokenStrategy';
import { PetChatModule } from 'src/petChat/petChat.module';
import { PetChatService } from 'src/petChat/petChat.service';


@Module({
  imports:[AuthModule,
    forwardRef(()=> PetChatModule),
    MongooseModule.forFeature([{
    name: 'NestPet',
    schema: PetSchema
  }])],
  controllers: [PetController],
  providers: [PetService, AccessTokenStrategy],
  exports: [PetService]
})
export class PetModule {}
