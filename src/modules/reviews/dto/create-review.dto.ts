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

    @ApiProperty({ example: "Username", description: "Комментатор" })
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ example: "123456", description: "ID комментатора" })
    @IsNotEmpty()
    readonly userId: string;

    @ApiProperty({ example: "https://test.site/example_pic.png", description: "Изображение" })
    @IsNotEmpty()
    readonly avatar: string;
}