import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PetDocument = Pet & Document

@Schema()
export class Pet{

    @Prop({type:String})
    userId: string

    @Prop({type:String})
    petImage: string

    @Prop({type:String, required:true})
    petName: string

    @Prop({type:String, required:true})
    petAge: string

    @Prop({type:String, required:true})
    petType: string

    @Prop({type:String, required:true})
    breed: string

}
export const PetSchema = SchemaFactory.createForClass(Pet)