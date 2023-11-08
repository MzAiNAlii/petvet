import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PetChatDto } from "./dto/petChat-dto";
import { PetChatDocument } from "./entities/petChat-entity";
import { PetService } from "src/pet/pet.service";


@Injectable()
export class PetChatService{
    constructor(@InjectModel('petchats') private readonly petChatModel: Model<PetChatDocument>,
    @Inject(forwardRef(() =>PetService)) private readonly petService: PetService){}

    async addChat(petChatDto: PetChatDto){

        const existingPet = await this.petService.findPet(petChatDto.petId)
        if(!existingPet){
            throw new HttpException('Pet Not Found', HttpStatus.NOT_FOUND)
        }
        const existingPetChat = await this.find(petChatDto.petId)
        if(existingPetChat){
            const updatePetChat = await this.upadte(petChatDto)
            return {
                message: "Messages added to existing chat",
                data: updatePetChat

            }

        }
       
        const messageArray = []
        petChatDto.messages.forEach((msg: any)=>{
            messageArray.push({
                content: msg.content,
                role: msg.role
            })

        })
      
        const addChat = await this.petChatModel.create({
        petId: petChatDto.petId,
        message: messageArray
        })

        return {
            message: "Chat Save Successfully",
            data: addChat
        }

    }
    async find(petId: string){
        const existingPetChatId = await this.petChatModel.findOne({petId})
        if(!existingPetChatId){
            throw new NotFoundException('Pet Not Found')
        }
        
        return this.petChatModel.findOne({petId: petId})

    }
    async upadte(petChatDto: PetChatDto){
        return this.petChatModel.findOneAndUpdate({petId: petChatDto.petId},{
            $push:{
                message: petChatDto.messages.map((msg: any)=>({
                    content: msg.content,
                    role: msg.role

                })
        )}
        })
    }

    async delete (petId: string){
        return this.petChatModel.deleteOne({petId: petId})
    }
}