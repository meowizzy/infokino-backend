import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { Review, ReviewSchema } from "./reviews.model";


@Module({
    controllers: [ReviewsController],
    providers: [ReviewsService],
    imports: [
        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
        JwtModule
    ],
})
export class ReviewsModule {}
