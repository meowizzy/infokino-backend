import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: "test@mail.com", description: "Электронная почта" })
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @ApiProperty({ example: "123456789", description: "Пароль" })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}