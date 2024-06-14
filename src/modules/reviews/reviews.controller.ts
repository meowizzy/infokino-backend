import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
    UseGuards
} from "@nestjs/common";
import { JwtAuthGuard } from "#src/guards/auth-guard/auth-guard";
import { RoleGuard } from "#src/guards/role-guard/role.guard";
import { Roles } from "#src/guards/role-guard/role.decorator";
import { Role } from "#src/guards/role-guard/role.enum";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Review } from "./reviews.model";
import { GetCurrentUserId } from "#src/guards/auth-guard/auth.decorator";

@ApiTags("Комментарии")
@Controller("reviews")
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Список комментариев к фильму" })
    @ApiResponse({ status: HttpStatus.OK, type: [Review] })
    @Get(":movieId")
    async all(@GetCurrentUserId() userId: string, @Param("movieId") movieId: number) {
        return this.reviewsService.getAll(userId, movieId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Создание комментария" })
    @ApiResponse({ status: HttpStatus.CREATED, type: [Review] })
    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    async create(@GetCurrentUserId() userId: string, @Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(userId, createReviewDto);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: "Обновление комментария" })
    @ApiResponse({ status: HttpStatus.OK, type: [Review] })
    @Put(":reviewId")
    @HttpCode(HttpStatus.OK)
    async update(@Param("reviewId") reviewId: string, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewsService.update(reviewId, updateReviewDto);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: "Удаление комментария" })
    @ApiResponse({ status: HttpStatus.OK, type: [Review] })
    @Delete(":reviewId")
    @HttpCode(HttpStatus.OK)
    async remove(@Param("reviewId") reviewId: string) {
        return this.reviewsService.remove(reviewId);
    }
}
