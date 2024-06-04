import { IsJWT, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
    @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjVkYTVmMWQ4MjQ0NjY2ODYwNjdjYzkiLCJlbWFpbCI6ImluZm9raW5vQG1haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzE3NDk0Nzk2LCJleHAiOjE3MjAwODY3OTZ9.k0_cgBWKB9CSRlBjfjx-8XyIwMCuoHOhZYz1xiwG99k", description: "refreshToken" })
    @IsNotEmpty()
    @IsJWT()
        refreshToken: string;
}