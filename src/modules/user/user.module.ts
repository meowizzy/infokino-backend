import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "./user.service";
import { User, UserSchema } from "./schemas/user.schema";
import { UserController } from "./user.controller";
import { FirebaseModule } from "#src/common/firebase/firebase.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule,
        FirebaseModule
    ],
})
export class UserModule {}
