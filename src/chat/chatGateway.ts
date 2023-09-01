import { OnModuleInit} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server} from 'socket.io'
import { UserService } from 'src/user/user.service';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class myGateway implements  OnModuleInit{
    constructor(private readonly jwtService: JwtService,
        private readonly chatService: ChatService,
        private readonly userService: UserService){}
    @WebSocketServer()
    server : Server

    onModuleInit() {
        
        this.server.on('connection', async (socket)=>{
            console.log("user connect")
            
            const token = socket.request.headers.authorization
            const decodedClaims: any = this.jwtService.decode(token)

           // const userId : any= decodedClaims.id
            console.log(decodedClaims.id);

            socket.broadcast.emit("getOnlineUser",{user_Id: decodedClaims.id})

            const updateStatus = await this.userService.updateUserStatus(decodedClaims.id,true)
            //console.log( updateStatus.is_Online);

            socket.on("Chats",(data)=>{
                socket.broadcast.emit('loadChat', data)
                //console.log(data);
                
        
            })
        
            socket.on('existChat', async (data)=>{
                const chats = await this.chatService.findUserChattingID(data)
                socket.emit('loadChat',{chats: chats})
        
            })
        
            socket.on("ChatDelete",async(id)=>{
                socket.broadcast.emit('chatMessageDelete',id)
            })

            
            // socket.on("sender",(Msg)=>{
            //     const sendMessage = this.chatService.saveChat({
            //     sender_id : decodedClaims.id,
            //     receiver_id: decodedClaims.id,
            //     message: Msg
            //     }).then(()=>{
            //     this.server.emit('msgFromReceive',Msg)  
            //     console.log("sender ",Msg)
            //     })
      
            // })

            // socket.on('receiver',(Msg)=>{
            //     const receiveMessage =   this.chatService.saveChat({
            //         sender_id : decodedClaims.id,
            //         receiver_id: decodedClaims.id,
            //         message: Msg
            //     }).then(()=>{
            //         this.server.emit('msgFromSender',Msg)
            //         console.log('receive ',Msg)
            //     })
            
            // })

            
            

        socket.on('disconnect', async()=>{
            console.log("User Disconnect")

            const updateStatus = await this.userService.updateUserStatus(decodedClaims.id,false)
        }) 

        })
    }

    
    

    // @SubscribeMessage('newMessage')
    // onNewMessage(@MessageBody() body: any){
    //     console.log(body);
        
    //     this.server.emit('message',{msg:body})

    // }
    

    // onModuleDestroy() {
    //     this.server.on('disconnect',(socket)=>{
    //         console.log("User Disconnect", socket.id)

    //     })
        
    //    }
    }
    
