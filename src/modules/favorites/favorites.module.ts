import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FavoritesController } from "./favorites.controller";
import { FavoritesService } from "./favorites.service";
import { Favorite, FavoriteSchema } from "./schemas";
import { JwtModule } from "@nestjs/jwt";

@Module({
    controllers: [FavoritesController],
    providers: [FavoritesService],
    imports: [
        MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }]),
        JwtModule
    ]
})
export class FavoritesModule {}
