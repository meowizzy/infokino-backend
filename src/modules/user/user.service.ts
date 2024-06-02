import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(userDto: CreateUserDto): Promise<User> {
        return await this.userModel.create({
            ...userDto,
            password: await this.hashPassword(userDto.password)
        });
    }

    async remove(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id).exec();
    }

    async findByEmailOrUsername(emailOrUsername: string, key: "email" | "username"): Promise<User> {
        return this.userModel.findOne({ [key]: emailOrUsername });
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}
