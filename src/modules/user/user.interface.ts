import { Role } from "#src/guards/role-guard/role.enum";
export interface UserQueryParams {
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filter?: Record<"role", Role.ADMIN | Role.USER | Role.MODERATOR>;
    search?: string;
}