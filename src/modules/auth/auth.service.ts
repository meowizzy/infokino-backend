import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AppErrors, ErrorsType } from "#src/common/errors";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { TokenService } from "../token/token.service";
import { Tokens } from "../token/token.model";
import { JwtService } from "@nestjs/jwt";
import * as process from "node:process";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(userDto: CreateUserDto): Promise<Tokens> {
        const isExist = await this.userService.findByEmailOrUsername(userDto.email, "email") ||
            await this.userService.findByEmailOrUsername(userDto.username, "username");

        if (isExist) {
            throw new HttpException(
                { message: AppErrors[ErrorsType.USER_EXIST], status: HttpStatus.BAD_REQUEST },
                HttpStatus.BAD_REQUEST
            );
        }

        const newUser = await this.userService.create(userDto);

        return this.tokenService.generateTokens({
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role
        });
    }

    async signIn(signInDto: SignInDto): Promise<Tokens> {
        const existUser = await this.userService.findByEmailOrUsername(signInDto.email, "email");

        if (!existUser) {
            throw new HttpException(
                { message: AppErrors[ErrorsType.USER_NOT_FOUND], status: HttpStatus.BAD_REQUEST },
                HttpStatus.BAD_REQUEST
            );
        }

        const validatePassword = await bcrypt.compare(signInDto.password, existUser.password);

        if (!validatePassword) {
            throw new HttpException(
                { message: AppErrors[ErrorsType.INCORRECT_ERROR], status: HttpStatus.NOT_FOUND },
                HttpStatus.NOT_FOUND
            );
        }

        return this.tokenService.generateTokens({
            userId: existUser.id,
            email: existUser.email,
            role: existUser.role
        });
    }

    async refresh(refreshToken: string) {
        try {
            const {
                userId,
                email,
                role
            } = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_TOKEN_SECRET
            });

            return this.tokenService.generateTokens({
                userId,
                email,
                role
            });
        } catch(err) {
            throw new UnauthorizedException();
        }
    }
}
