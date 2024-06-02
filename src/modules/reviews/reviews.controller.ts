import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Controller("reviews")
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Get(":movieId")
    async all(@Param("movieId") movieId: number) {
        return this.reviewsService.getAll(movieId);
    }

    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(createReviewDto);
    }

    @Patch(":reviewId")
    @HttpCode(HttpStatus.OK)
    async update(@Param("reviewId") reviewId: string, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewsService.update(reviewId, updateReviewDto);
    }

    @Delete(":reviewId")
    @HttpCode(HttpStatus.OK)
    async remove(@Param("reviewId") reviewId: string) {
        return this.reviewsService.remove(reviewId);
    }
}
