import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { Role } from "./role.enum";
import { ROLE_KEY } from "./role.decorator";
import { Request } from "express";
import { UserDocument } from "../../modules/user/schemas/user.schema";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRole) {
            return true;
        }

        try {
            const request = context.switchToHttp().getRequest();
            const user = this.decodeToken(this.extractTokenFromHeader(request));
            const roleValues = Object.values(JSON.parse(JSON.stringify(Role)));

            return roleValues.some(role => user && user.role === role);
        } catch {
            return false;
        }
    }

    private decodeToken(token: string): UserDocument {
        return this.jwtService.decode(token);
    }

    private extractTokenFromHeader({ headers: { authorization } }: Request) {
        const [type, token] = authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}