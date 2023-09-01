import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat-dto';

@Controller('chat')
export class ChatController {
    constructor (private readonly chatService: ChatService){}

    @Post('chatting')
    saveChat(@Body() chatDto: ChatDto){
        return this.chatService.saveChat(chatDto)
    }

    @Delete("/:id")
    deleteChat(@Param('id') id: string){
        return this.chatService.deleteChat(id)
    }
}
