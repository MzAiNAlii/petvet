import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from './entities/pets-entity';
import { AuthModule } from 'src/auth/auth.module';
import { AccessTokenStrategy } from 'src/auth/strategy/AccessTokenStrategy';

@Module({
  imports:[AuthModule,MongooseModule.forFeature([{
    name: 'NestPet',
    schema: PetSchema
  }])],
  controllers: [PetController],
  providers: [PetService, AccessTokenStrategy]
})
export class PetModule {}
