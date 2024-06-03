import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FavoritesController } from "./favorites.controller";
import { FavoritesService } from "./favorites.service";
import { Favorite, FavoriteSchema } from "./schemas";

@Module({
    controllers: [FavoritesController],
    providers: [FavoritesService],
    imports: [
        MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }]),
    ]
})
export class FavoritesModule {}
