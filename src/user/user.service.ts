import { Injectable } from '@nestjs/common';
import { User } from './entities/user-entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { SignupDto } from './dto/signup-dto';
import {fbId} from './dto/signup-dto'
import { LockoutDocument } from './entities/lockout';
import { LockoutDto } from './dto/lockout-dto';

@Injectable()
export class UserService {
    constructor (@InjectModel('nestUsers') private readonly userModel : Model<User>,
    @InjectModel('nestLockout') private readonly lockoutModel: Model<LockoutDocument>){}

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
        return this.userModel.findOneAndUpdate({_id: id},{
            $set:{
                password
            }
        },{new: true})
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
   findFbUser(fbUserId: fbId){
    return this.userModel.findOne({fbUserId: fbUserId.fbUserId})
   }
   createFbUser(fbUserId: fbId){
    
    const newUser = new this.userModel({fbUserId: fbUserId.fbUserId})
    return newUser.save()
   }

   createlockout(email: string){
    return this.lockoutModel.create({
        email,
        requestTYpe: "login"
    })
   }

   findEmail(email: string){
    return this.lockoutModel.findOne({email})
   }
   findId(id: string){
    return this.lockoutModel.findById({_id: id})
   }
    updateUserLockoutCount(id: string, currentExppirationTime: string, expirationTime: string){
        this.findId(id)
        return this.lockoutModel.findByIdAndUpdate(id,{
            $set:{
                currentTime: currentExppirationTime,
                expireTime: expirationTime,
                isLock: true,
            }},{new: true})


    }
    updateUserLockoutCurrentTime(id: string, currentTime: string){
        this.findId(id)
        return this.lockoutModel.findByIdAndUpdate(id,{
            $set:{
                currentTime: currentTime
            }},{new: true})
    }

}

