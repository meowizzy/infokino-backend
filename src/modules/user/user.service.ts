import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";



@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getById(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async isExist(email: string): Promise<boolean> {
        const user = await this.userModel.findOne({ email });

        return !!user;
    }

    async create(userDto: CreateUserDto): Promise<CreateUserDto> {
        if (await this.isExist(userDto.email)) {
            throw new HttpException(
                { message: "User with this email already exists", status: HttpStatus.BAD_REQUEST },
                HttpStatus.BAD_REQUEST
            );
        }

        userDto.password = await this.hashPassword(userDto.password);

        return await this.userModel.create(userDto);
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}
