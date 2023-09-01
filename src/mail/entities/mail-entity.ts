import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MailDocumnet = Mail & Document;

@Schema()
export class Mail {
    
    @Prop({type: String, required: true})
    email : string

    @Prop({type: String, default: " " })
    UserOtp: string

    @Prop({type: String, })
    expire: string
}

export const mailOtpSchema = SchemaFactory.createForClass(Mail)
