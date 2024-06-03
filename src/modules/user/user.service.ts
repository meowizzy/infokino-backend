import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly jwtService: JwtService
    ) {}

    async create(userDto: CreateUserDto): Promise<UserDocument> {
        return await this.userModel.create({
            ...userDto,
            password: await this.hashPassword(userDto.password)
        });
    }

    async getAll(): Promise<UserDocument[]> {
        return await this.userModel.find().select("-password").exec();
    }

    async getProfile(token: string): Promise<UserDocument> {
        const { userId } = await this.jwtService.decode(token);

        return await this.userModel.findById(userId).select("-password").exec();
    }

    async remove(id: string): Promise<UserDocument> {
        return await this.userModel.findByIdAndDelete(id).select("-password").exec();
    }

    async findByEmailOrUsername(emailOrUsername: string, key: "email" | "username"): Promise<UserDocument> {
        return this.userModel.findOne({ [key]: emailOrUsername }).exec();
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}
