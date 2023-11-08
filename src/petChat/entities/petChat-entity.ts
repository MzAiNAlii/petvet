import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type PetChatDocument = PetChat & Document;
@Schema()
export class PetChat{

    @Prop({type: String})
    petId: string

    @Prop([
        {
          content: { type: String },
          role: { type: String },
          time: { type: Date, default: Date.now },
        },
      ])
      message: Array<{
        content: string;
        role: string;
        time: Date;
      }>;
}
export const PetChatSchema = SchemaFactory.createForClass(PetChat)