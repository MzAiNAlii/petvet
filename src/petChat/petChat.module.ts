import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PetChatSchema } from "./entities/petChat-entity";
import { PetModule } from "src/pet/pet.module";
import { PetChatController } from "./petChat.controller";
import { PetChatService } from "./petChat.service";
import { PetService } from "src/pet/pet.service";

@Module({
    imports:[forwardRef(()=> PetModule),
        MongooseModule.forFeature([{
        name: "petchats",
        schema: PetChatSchema
    }])],
    controllers:[PetChatController],
    providers:[PetChatService],
    exports:[PetChatService]

})

export class PetChatModule{};