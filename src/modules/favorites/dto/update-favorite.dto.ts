import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateFavoriteDto {
    @ApiProperty({ example: 54212, description: "ID Фильма" })
    @IsNotEmpty()
    @IsNumber()
        movieId: number;
}