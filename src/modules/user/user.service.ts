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

    async isExist(query: string): Promise<boolean> {
        const user = await this.userModel.findOne({ query });

        return !!user;
    }

    async create(userDto: CreateUserDto): Promise<CreateUserDto> {
        const isExist = await this.isExist(userDto.email) || await this.isExist(userDto.username);

        if (isExist) {
            throw new HttpException(
                { message: "User with this username or email already exists", status: HttpStatus.BAD_REQUEST },
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
