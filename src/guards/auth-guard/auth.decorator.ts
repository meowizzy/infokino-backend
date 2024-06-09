import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '#src/modules/user/schemas/user.schema';

export const GetCurrentUserId = createParamDecorator(
    (_, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const user: any = request.user as User;

        console.log(user)
        return user.userId;
    },
);