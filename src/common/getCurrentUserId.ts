import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

export function getCurrentUserId(jwtService: JwtService, { headers: { authorization } }: Request) {
    const token = authorization.replace("Bearer ", "");

    return jwtService.decode(token);
}