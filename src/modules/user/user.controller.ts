import {
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { Request, Response } from "express";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { UserService } from "./user.service";
import { User, UserDocument } from "./schemas/user.schema";
import { JwtAuthGuard } from "#src/guards/auth-guard/auth-guard";
import { RoleGuard } from "#src/guards/role-guard/role.guard";
import { Roles } from "#src/guards/role-guard/role.decorator";
import { Role } from "#src/guards/role-guard/role.enum";
import { MimeType } from "#src/common/mime-type.enum";
import { GetCurrentUserId } from "#src/guards/auth-guard/auth.decorator";

@ApiTags("Пользователь")
@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer',
    })
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Get("/profile")
    async profile(@Req() { headers: { authorization } }: Request): Promise<UserDocument> {
        if (!authorization) throw new UnauthorizedException();

        const token = authorization.replace("Bearer ", "");

        return await this.userService.getProfile(token);
    }
    @ApiOperation({ summary: "Список всех пользователей (ADMIN)" })
    @ApiResponse({ status: HttpStatus.OK, type: [User] })
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
    @Get("/list")
    async list(): Promise<UserDocument[]> {
        return await this.userService.getAll();
    }

    @ApiOperation({ summary: "Удаление пользователя (ADMIN)" })
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
    @Delete(":userId")
    async remove(@Param("userId") userId: string): Promise<UserDocument> {
        return await this.userService.remove(userId);
    }

    @Get("/profile/avatar/:filename")
    async getAvatar(@Param("filename") filename: string, @Res() res: Response) {
        return this.userService.getAvatar(filename, res);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("avatar"))
    @HttpCode(HttpStatus.OK)
    @Post("/profile/avatar")
    async setAvatar(
        @GetCurrentUserId() userId: string,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: MimeType.IMAGE_REGEX,
                })
                .addMaxSizeValidator({
                    maxSize: MimeType.MAX_SIZE
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                }),
        ) file: Express.Multer.File
    ) {
        return await this.userService.setAvatar(userId, file);
    }
}