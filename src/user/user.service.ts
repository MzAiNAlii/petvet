import { Injectable } from '@nestjs/common';
import { UserDocumnet } from './entities/user-entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { SignupDto } from './dto/signup-dto';


@Injectable()
export class UserService {
    constructor (@InjectModel('nestUsers') private readonly userModel : Model<UserDocumnet>){}

    createUser(singupDto: SignupDto){
        const newUser = new this.userModel(singupDto)
        return newUser.save()


    }

    findByEmail(email: string){
        return this.userModel.findOne({email})
    }

    findAll(){
        return this.userModel.find()
    }

    findOneAndUpdate(id: any, password: string){
        return this.userModel.findOneAndUpdate(id,{
            $set:{
                password
            }
        })
    }

    findById(id: string){
        return this.userModel.findById({_id: id})
    }

    updateUserStatus( id: string, is_Online: boolean){
       return this.userModel.findByIdAndUpdate(id,{
           $set:{
               is_Online: is_Online
               
           }
       },{new: true})

       
   }

}
