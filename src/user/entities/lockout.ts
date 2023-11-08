import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type LockoutDocument = Lockout & Document

@Schema({timestamps: true})
export class Lockout{
    @Prop({type:String})
    email: string

    @Prop({type:String})
    requestTYpe: string

    @Prop({type: Number, default: 1})
    lockoutCountr: number

    @Prop({type: String})
    currentTime: string

    @Prop({type:String})
    expireTime: string
    
    @Prop({type: Boolean, default: false})
    isLock:boolean
}

export const LockoutSchema = SchemaFactory.createForClass(Lockout)