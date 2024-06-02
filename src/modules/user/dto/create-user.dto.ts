import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: "test@mail.com", description: "Электронная почта", uniqueItems: true })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: "Username", description: "Юзернейм", uniqueItems: true })
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ example: "123456789", description: "Пароль" })
    @IsNotEmpty()
        password: string;
}