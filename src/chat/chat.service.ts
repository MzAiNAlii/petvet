import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDto } from './dto/chat-dto';
import { ChatDocument } from './entities/chat-entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
    constructor(@InjectModel('Nestchat') private readonly chatModel: Model<ChatDocument>,
        private readonly userService: UserService){}


    async saveChat(chatDto : ChatDto){

        const newChat = new this.chatModel(chatDto)
        return await newChat.save()

    }
    async deleteChat(id: string){
        return  await this.chatModel.findByIdAndDelete(id)
    }

    async findUserChattingID(chatDto: ChatDto){
        const{sender_id,receiver_id, ...rest} = chatDto
        return await this.chatModel.find({
            $or:[
                    {sender_id: sender_id, receiver_id: receiver_id},
                    {sender_id: receiver_id, receiver_id: sender_id}
            ]
            
                    
        })

    }

    

    




        
        

    
}
