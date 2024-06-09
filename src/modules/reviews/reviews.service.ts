import {Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Review } from "./reviews.model";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";


@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel(Review.name)
        private readonly reviewModel: Model<Review>,
        private userService: UserService,
    ) {}

    async getAll(userId: string, movieId: number) {
        const user = await this.userService.findById(userId);
        await this.reviewModel.updateMany(
            {
                userId
            },
            {
                $set: {
                    avatar: user.avatar,
                    username: user.username
                }
            }
        );

        const reviews = await this.reviewModel.find({ movieId }).exec();

        return reviews;
    }

    async create(userId: string, createReviewDto: CreateReviewDto) {
        const user = await this.userService.findById(userId);

        const review = await this.reviewModel.create({
            ...createReviewDto,
            userId: userId,
            username: user.username,
            avatar: user.avatar || null
        });

        return review;
    }

    async update(reviewId: string, updateReviewDto: UpdateReviewDto) {
        const review = await this.reviewModel.findByIdAndUpdate(reviewId, updateReviewDto).exec();

        return review;
    }

    async remove(reviewId: string) {
        return this.reviewModel.findByIdAndDelete(reviewId);
    }

    async updateDocument(id: string, payload: { avatar?: string, username?: string, email?: string }) {
        this.reviewModel.findOneAndUpdate({ userId: id }, { ...payload });
    }
}
