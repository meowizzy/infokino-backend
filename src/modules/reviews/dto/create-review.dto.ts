import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    readonly movieId: string;

    @IsNotEmpty()
    readonly comment: string;

    @IsNotEmpty()
    @IsNumber()
    readonly rating: number;

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly userId: string;

    @IsNotEmpty()
    readonly avatar: string;
}