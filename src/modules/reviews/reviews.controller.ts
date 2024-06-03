import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Review } from "./reviews.model";
import { JwtAuthGuard } from "../../guards/auth-guard";

@ApiTags("Комментарии")
@Controller("reviews")
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @ApiOperation({ summary: "Список комментариев к фильму" })
    @ApiResponse({ status: HttpStatus.OK, type: [Review] })
    @Get(":movieId")
    async all(@Param("movieId") movieId: number) {
        return this.reviewsService.getAll(movieId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Создание комментария" })
    @ApiResponse({ status: HttpStatus.CREATED, type: [Review] })
    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(createReviewDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Обновление комментария" })
    @ApiResponse({ status: HttpStatus.OK, type: [Review] })
    @Patch(":reviewId")
    @HttpCode(HttpStatus.OK)
    async update(@Param("reviewId") reviewId: string, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewsService.update(reviewId, updateReviewDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Удаление комментария" })
    @ApiResponse({ status: HttpStatus.OK, type: [Review] })
    @Delete(":reviewId")
    @HttpCode(HttpStatus.OK)
    async remove(@Param("reviewId") reviewId: string) {
        return this.reviewsService.remove(reviewId);
    }
}
