import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { User, UserSchema } from "./schemas/user.schema";
import { UserController } from "./user.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule,
    ],
    exports: [
        UserService
    ],
})
export class UserModule {}
