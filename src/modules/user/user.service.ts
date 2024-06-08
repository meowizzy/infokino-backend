import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as fs from 'fs';
import * as bcrypt from "bcrypt";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";


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

    async setAvatar(id: string, file: Express.Multer.File): Promise<{ avatar: string }>   {
        const user = await this.userModel.findById(id);

        if (user.avatar) {
            const [path, filename] = user.avatar.split("/");
            const filePath = `uploads/${filename}`;

            fs.chmod(filePath, 0o600, () => {
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                    console.log("FILE DELETED");
                });
            });

            user.avatar = process.env.API_HOST + file.filename;
            user.save();
        } else {
            user.avatar = process.env.API_HOST + file.filename;
            user.save();
        }

        return { avatar: user.avatar };
    }

    async remove(id: string): Promise<UserDocument> {
        return await this.userModel.findByIdAndDelete(id).select("-password").exec();
    }

    async getAll(): Promise<UserDocument[]> {
        return await this.userModel.find().select("-password").exec();
    }

    async getProfile(token: string): Promise<UserDocument> {
        const { userId } = await this.jwtService.decode(token);

        return await this.userModel.findById(userId).select("-password").exec();
    }

    async findByEmailOrUsername(emailOrUsername: string, key: "email" | "username"): Promise<UserDocument> {
        return this.userModel.findOne({ [key]: emailOrUsername }).exec();
    }

    async findById(id: string): Promise<UserDocument> {
        return this.userModel.findById(id).exec();
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}
