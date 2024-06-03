import { Body, Controller, HttpCode, HttpStatus, Param, Put, UseGuards } from "@nestjs/common";
import { RecommendsService } from "./recommends.service";
import { Recommends } from "./models/recommends.schema";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../guards/auth-guard/auth-guard";

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