import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateReviewDto {
    @IsNotEmpty()
    @IsString()
    readonly comment: string;

    @IsNotEmpty()
    @IsNumber()
    readonly rating: number;
}