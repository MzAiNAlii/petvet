import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";


export type UserDocumnet = Users & Document

@Schema()   
export class Users{
    @Prop({type: String,required:true })
    userName: string
    
    @Prop({type: String, required: true, unique: true})
    email : string

    @Prop({type: String, required: true})
    password: string

    @Prop({type: Boolean, default: false})
    is_Online: boolean
}

export const UserSchema = SchemaFactory.createForClass(Users)