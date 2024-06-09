import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "./user.service";
import { User, UserSchema } from "./schemas/user.schema";
import { UserController } from "./user.controller";
import { ReviewsModule } from "../reviews/reviews.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule
    ],
})
export class UserModule {}
