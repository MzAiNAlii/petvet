import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PetDocument } from './entities/pets-entity';
import { Model } from 'mongoose';
import { PetDto } from './dto/pet-dto';

@Injectable()
export class PetService {
    constructor(@InjectModel('NestPet') private readonly petModel: Model<PetDocument>){}

    async createPet(  petDto: PetDto){
        const {id,...rest}=petDto;
        const data= {...rest,userId:id}
        
        const petInfo = new this.petModel(data)
        await petInfo.save();
       
        return {
            message: "Pets created Successfull",
            data: petInfo
        }

    }

    async findAllPet(petDto : PetDto ){
        const {id} = petDto
        //console.log(id)
     
        const findPet = await this.petModel.find({userId:id})
        //console.log(findPet);
        
        if(!findPet){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }

        return {
            message: "Pets find Successfully",
            data: findPet
        }
    }

    async updatePet( id: string, petDto: PetDto){
         const {petName, petAge, petType,breed} = petDto;
        
        const findId =  await this.petModel.findById({_id:id})
        if(!findId.id ){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        const updatePetInfo = await this.petModel.findByIdAndUpdate(findId._id,{
            $set:{
                petName:petName,
                petAge: petAge,
                petType: petType,
                breed: breed,
                
            }
        },{new: true})
        

        return {
            message: "Update Successfully",
            status: true
        }
        
    }

    async deletePet(petDto: PetDto){
        const {id} = petDto;
        console.log(id)

        const findId = await this.petModel.findById({_id:id})
        if(!findId){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }

        const deletePet = await this.petModel.deleteOne(findId._id)

        return {
            message : "Pet Delete Successfully",
            status: true
        }
    }

    

    
}
