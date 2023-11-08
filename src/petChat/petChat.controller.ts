import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { PetChatDto } from "./dto/petChat-dto";
import { PetChatService } from "./petChat.service";

@Controller('petChat')
export class PetChatController{
    constructor(private readonly petchatService: PetChatService){}

    @Post('save')
    @HttpCode(200)
    saveChat(@Body() petChatDto: PetChatDto){
        return this.petchatService.addChat(petChatDto)
    }
    @Get(':id')
    @HttpCode(200)
    getChatHistory(@Param('id') id: string){
        return this.petchatService.find(id)
    }

}