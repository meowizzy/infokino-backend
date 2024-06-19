import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "#src/guards/auth-guard/auth-guard";
import { GetCurrentUserId } from "#src/guards/auth-guard/auth.decorator";
import { RecommendsService } from "./recommends.service";
import { Recommends } from "./models/recommends.schema";
import { SetRecommendsDto } from "./dto/set-recommends.dto";

@UseGuards(JwtAuthGuard)
@ApiTags("Рекомендации пользователя")
@Controller("recommends")
export class RecommendsController {
    constructor(private readonly recommendsService: RecommendsService) {}

    @Post()
    @ApiOperation({ summary: "Изменение списка жанров" })
    @ApiResponse({ status: HttpStatus.OK, type: [Recommends] })
    @HttpCode(HttpStatus.OK)
    async setRecommends(@GetCurrentUserId() userId: string, @Body() dto: SetRecommendsDto): Promise<Recommends> {
        return this.recommendsService.setItems(userId, dto);
    }

    @Get()
    @ApiOperation({ summary: "Получить список рекоммендаций" })
    @ApiResponse({ status: HttpStatus.OK, type: [Recommends] })
    @HttpCode(HttpStatus.OK)
    async getRecommends(@GetCurrentUserId() userId: string) {
        console.log(userId);
        return this.recommendsService.getItems(userId);
    }
}