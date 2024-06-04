import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
    @ApiProperty({ example: 12345, description: "ID фильма" })
    @IsNotEmpty()
    readonly movieId: string;

    @ApiProperty({ example: "Lorem ipsum dolor", description: "Комментарий" })
    @IsNotEmpty()
    readonly comment: string;

    @ApiProperty({ example: 2.5, description: "Оценка" })
    @IsNotEmpty()
    @IsNumber()
    readonly rating: number;
}