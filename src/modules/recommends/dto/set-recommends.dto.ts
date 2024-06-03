import { ApiProperty } from "@nestjs/swagger";

export class SetRecommendsDto {
    @ApiProperty({ example: "12345", description: "ID Пользователя" })
        userId: string;
    @ApiProperty({ example: "Фантастика", description: "Жанры" })
        items: string[];
}