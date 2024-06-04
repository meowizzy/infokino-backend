import { Body, Controller, Delete, Get, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FavoritesService } from "#src/modules/favorites/favorites.service";
import { UpdateFavoriteDto } from "#src/modules/favorites/dto/update-favorite.dto";
import { JwtAuthGuard } from "#src/guards/auth-guard/auth-guard";
import { Favorite } from "#src/modules/favorites/schemas";
import { GetCurrentUserId } from "#src/guards/auth-guard/auth.decorator";

@UseGuards(JwtAuthGuard)
@ApiTags("Избранные")
@Controller("favorites")
export class FavoritesController {
    constructor(
        private favoritesService: FavoritesService,
    ) {}

    @ApiOperation({ summary: "Добавление/удаление фильма из избранных" })
    @ApiResponse({ status: HttpStatus.OK, type: Favorite })
    @Post()
    async updateOrCreate(@GetCurrentUserId() userId: string, @Body() { movieId }: UpdateFavoriteDto) {

        return this.favoritesService.updateOrCreate(userId, movieId);
    }

    @ApiOperation({ summary: "Получить список избранных" })
    @ApiResponse({ status: HttpStatus.OK, type: Favorite })
    @Get()
    async list(@GetCurrentUserId() userId: string) {

        return this.favoritesService.getItems(userId);
    }

    @ApiOperation({ summary: "Удалить список избранных" })
    @ApiResponse({ status: HttpStatus.OK, type: Favorite })
    @Delete()
    async removeDocument(@GetCurrentUserId() userId: string) {

        return this.favoritesService.remove(userId);
    }
}