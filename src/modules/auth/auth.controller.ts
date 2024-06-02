import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/signup")
    @ApiOperation({ summary: "Регистрация" })
    @ApiResponse({ status: 200, type: CreateUserDto })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto);
    }
}
