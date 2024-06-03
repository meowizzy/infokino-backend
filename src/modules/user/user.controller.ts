import { Controller, Delete, Get, Header, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./schemas/user.schema";
import { JwtAuthGuard } from "../../guards/auth-guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Пользователь")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async profile() {

    }

    @Delete(":userId")
    async remove(@Param("userId") userId: string): Promise<User> {
        return await this.userService.remove(userId);
    }
}