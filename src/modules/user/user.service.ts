import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { FirebaseService } from "#src/common/firebase/firebase.service";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly firebaseService: FirebaseService,
        private readonly jwtService: JwtService
    ) {}

    async create(userDto: CreateUserDto): Promise<UserDocument> {
        return await this.userModel.create({
            ...userDto,
            password: await this.hashPassword(userDto.password)
        });
    }

    async setAvatar(id: string, file: Express.Multer.File)   {
        const user = await this.userModel.findById(id);
        const bucket = this.firebaseService.getStorageBucket();
        const fileName = `${Date.now()}_${file.originalname}`;

        if (user.avatar) {
            await this.removeAvatar(user.avatar);
        }

        const fileUpload = bucket.file(fileName);
        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        return new Promise((resolve, reject) => {
            stream.on("error", (error) => {
                reject(error);
            });

            stream.on("finish", async () => {
                const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

                await fileUpload.makePublic();

                user.avatar = imageUrl;

                await user.save();

                resolve({ avatar: user.avatar });
            });

            stream.end(file.buffer);
        });
    }

    async removeAvatar(avatar: string) {
        const avatarParts = avatar.split("/");
        const filename = avatarParts[avatarParts.length - 1];

        await this.firebaseService.getStorageBucket().deleteFiles({
            prefix: filename
        });
    }

    async remove(id: string): Promise<UserDocument> {
        const user = await this.userModel.findById(id).exec();

        if (user.avatar) {
            await this.removeAvatar(user.avatar);
        }

        return await this.userModel.findByIdAndDelete(id).select("-password").exec();
    }

    async getAll(): Promise<UserDocument[]> {
        return await this.userModel.find().select("-password").exec();
    }

    async getProfile(token: string): Promise<UserDocument> {
        console.log(token)
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
