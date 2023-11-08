import { Controller, Post, Body, HttpCode, Put, UseGuards, Get, Delete, Param } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetDto } from './dto/pet-dto';
import { AccessTokenGuard } from 'src/auth/guard/accessToken-guard';

@Controller('pet')
//@UseGuards(AccessTokenGuard)
export class PetController {
    constructor(private readonly petServices: PetService){}

    
    @Post('createPetInfo')
    @HttpCode(200)
    createPet(@Body()   petDto: PetDto){
        return this.petServices.createPet(petDto)
    }

    @Get('findPet/:id')
    @HttpCode(200)
    findPet(@Param() petDto : PetDto){
        
        return this.petServices.findAllPet(petDto)
    }

    @Get('sreachBreed/:petName/:petBreed')
    @HttpCode(200)
    sreachPetBrees(@Param() param: any ){
        const {petName, petBreed} = param
        return this.petServices.searchBreed(petName, petBreed)
    }

    @Put('updatePet/:id')
    @HttpCode(200)
    updatePet(@Param('id') id: string,  @Body() petDto: PetDto){
        
        return this.petServices.updatePet(id,petDto)
    }

    @Delete('deletePet/:id')
    @HttpCode(200)
    deletePet(@Param() petDto : PetDto){
        return this.petServices.deletePet(petDto)
    }


   

}
