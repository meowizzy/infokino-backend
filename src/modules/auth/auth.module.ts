import { Module } from "@nestjs/common";
import { JwtStrategy } from "#src/strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { TokenModule } from "../token/token.module";

@Module({
    imports: [
        TokenModule,
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
