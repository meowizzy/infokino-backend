import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Review } from "./reviews.model";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";


@Injectable()
export class ReviewsService {
    constructor(@InjectModel(Review.name) private readonly reviewModel: Model<Review>) {}

    async getAll(movieId: number) {
        const reviews = await this.reviewModel.find({ movieId }).exec();

        return reviews;
    }

    async create(createReviewDto: CreateReviewDto) {
        const review = await this.reviewModel.create(createReviewDto);

        return review;
    }

    async update(reviewId: string, updateReviewDto: UpdateReviewDto) {
        const review = await this.reviewModel.findByIdAndUpdate(reviewId, updateReviewDto).exec();

        return review;
    }

    async remove(reviewId: string) {
        return this.reviewModel.findByIdAndDelete(reviewId);
    }
}
