import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user-entity';
import { AuthModule } from 'src/auth/auth.module';
import { LockoutSchema } from './entities/lockout';

@Module({
  imports: [
    forwardRef(()=> AuthModule),
    MongooseModule.forFeature([
      {
    name: "nestUsers",
    schema: UserSchema
    },
    {
      name: "nestLockout",
      schema: LockoutSchema
    }
  ])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
