import { ApiProperty } from "@nestjs/swagger";

export class SetRecommendsDto {
    @ApiProperty({ example: "Фантастика", description: "Жанры" })
        items: string[];
}