import { Module } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Review, ReviewSchema } from "./reviews.model";

@Module({
    controllers: [ReviewsController],
    providers: [ReviewsService],
    imports: [
        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    ],
})
export class ReviewsModule {}
