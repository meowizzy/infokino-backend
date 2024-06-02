import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateReviewDto {
    @ApiProperty({ example: "Lorem ipsum", description: "Комментарий" })
    @IsNotEmpty()
    @IsString()
    readonly comment: string;

    @ApiProperty({ example: 5, description: "Оценка" })
    @IsNotEmpty()
    @IsNumber()
    readonly rating: number;
}