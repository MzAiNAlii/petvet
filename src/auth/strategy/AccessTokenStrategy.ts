import { Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService: ConfigService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpire: false,
            secretOrKey: configService.get<string>("SECRET_KEY")
    })

    }
   async validate(payload: any){
     console.log("payload",payload);
    
        return {userId: payload ,email: payload}
    }
    


    

}