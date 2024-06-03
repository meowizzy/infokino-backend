import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "#src/guards/role-guard/role.enum";
import { Tokens } from "./token.model";


@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    generateTokens(payload: { userId: string, email: string, role: Role.ADMIN | Role.USER }): Tokens {
        return {
            accessToken: this.generateJwtAccessToken(payload),
            refreshToken: this.generateJwtRefreshToken(payload),
        };
    }

    generateJwtAccessToken(payload: { userId: string, email: string, role: Role.ADMIN | Role.USER }): string {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            expiresIn: "1d",
        });
    }

    generateJwtRefreshToken(payload: { userId: string, email: string, role: Role.ADMIN | Role.USER }): string {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_TOKEN_SECRET,
            expiresIn: "30d",
        });
    }
}
