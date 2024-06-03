import { ApiProperty } from "@nestjs/swagger";

export class Tokens {
    @ApiProperty({ example: "access_token", description: "Access Token" })
        accessToken: string;

    @ApiProperty({ example: "refresh_token", description: "Refresh Token" })
        refreshToken: string;
}