import { Body, Controller, HttpCode, HttpStatus, Param, Put, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "#src/guards/auth-guard/auth-guard";
import { RecommendsService } from "./recommends.service";
import { Recommends } from "./models/recommends.schema";

@UseGuards(JwtAuthGuard)
@ApiTags("Рекомендации пользователя")
@Controller("recommends")
export class RecommendsController {
    constructor(private readonly recommendsService: RecommendsService) {}

    @Put("/:userId")
    @ApiOperation({ summary: "Изменение списка жанров" })
    @ApiResponse({ status: HttpStatus.OK, type: [Recommends] })
    @HttpCode(HttpStatus.OK)
    async setRecommends(@Param("userId") userId: string, @Body() setRecommendsDto: string[]): Promise<Recommends> {
        return this.recommendsService.setItems({
            userId,
            items: setRecommendsDto
        });
    }
}