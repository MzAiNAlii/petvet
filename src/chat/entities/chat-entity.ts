import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


export type ChatDocument = Chat & Document

@Schema()
export class Chat{
    @Prop({type: mongoose.Types.ObjectId , ref: 'UserSchema'})
    sender_id: string

    @Prop({type: mongoose.Types.ObjectId , ref: 'UserSchema'})
    receiver_id: string

    @Prop({type: String})
    message: string
}

export const chatSchema= SchemaFactory.createForClass(Chat)