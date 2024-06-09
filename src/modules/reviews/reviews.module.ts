import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { Review, ReviewSchema } from "./reviews.model";
import { UserModule } from "../user/user.module";


@Module({
    controllers: [ReviewsController],
    imports: [
        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
        JwtModule,
        UserModule
    ],
    providers: [ReviewsService],
    exports: [ReviewsService],
})
export class ReviewsModule {}
