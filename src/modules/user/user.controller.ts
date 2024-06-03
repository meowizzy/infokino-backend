import { Controller, Delete, Get, HttpStatus, Param, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User, UserDocument } from "./schemas/user.schema";
import { JwtAuthGuard } from "../../guards/auth-guard/auth-guard";
import { RoleGuard } from "../../guards/role/role.guard";
import { Roles } from "../../guards/role/role.decorator";
import { Role } from "../../guards/role/role.enum";

@ApiTags("Пользователь")
@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @ApiOperation({ summary: "Профиль пользователя" })
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @Get("/profile")
    @UseGuards(JwtAuthGuard)
    async profile(@Req() { headers: { authorization } }: Request): Promise<UserDocument> {
        if (!authorization) throw new UnauthorizedException();

        const token = authorization.replace("Bearer ", "");

        return await this.userService.getProfile(token);
    }

    @ApiOperation({ summary: "Удаление пользователя (ADMIN)" })
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN)
    @Delete(":userId")
    async remove(@Param("userId") userId: string): Promise<UserDocument> {
        return await this.userService.remove(userId);
    }
}