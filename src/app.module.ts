import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./modules/user/user.module";
import { ReviewsModule } from "./modules/reviews/reviews.module";
import { TokenModule } from "./modules/token/token.module";
import { FavoritesModule } from "./modules/favorites/favorites.module";
import { RecommendsModule } from "./modules/recommends/recommends.module";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_DB_URI),
        AuthModule,
        UserModule,
        ReviewsModule,
        TokenModule,
        FavoritesModule,
        RecommendsModule
    ],
})
export class AppModule {}
