import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Tokens } from "../token/token.model";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/sign-up")
    @ApiOperation({ summary: "Регистрация" })
    @ApiResponse({ status: 200, type: Tokens })
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto);
    }

    @Post("/sign-in")
    @ApiOperation({ summary: "Логин" })
    @ApiResponse({ status: HttpStatus.OK, type: Tokens })
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }
}
