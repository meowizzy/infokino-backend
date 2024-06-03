import { SetMetadata } from "@nestjs/common";
import { Role } from "./role.enum";

export const ROLE_KEY = "role";
export const Roles = (role: Role) => {
    console.log("Role:  ", role);
    return SetMetadata(ROLE_KEY, role);
};