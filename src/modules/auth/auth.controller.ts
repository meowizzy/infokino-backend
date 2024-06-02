import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/signup")
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto);
    }
}
