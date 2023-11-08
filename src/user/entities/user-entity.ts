import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
@Prop({type: String, required: true, unique: true})
  email: string;

 

  @Prop({type: String, required: true, unique: true})
  password: string;

  @Prop()
  userType: string;

  @Prop()
  fbUserId: string;
}


export const UserSchema = SchemaFactory.createForClass(User);


UserSchema.pre('save', function (next) {
    if (!this.email && !this.password && !this.fbUserId) {
      next(new Error('Either email and password or fbUserId must be provided.'));
    } else {
      next();
    }
  });

// import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
// import { Document } from "mongoose";
// import {PickType} from "@nestjs/mapped-types"


// export type UserDocumnet = Users & Document

// @Schema()   
// export class Users{
   

    
//     @Prop({type: String, required: true, unique: true})
//     email : string

//     @Prop({type: String })
//     password: string

//     @Prop({type: String})
//     fbUserId: string

//     @Prop({type: Boolean, default: false})
//     is_Online: boolean
// }


// export const UserSchema = SchemaFactory.createForClass(Users)

