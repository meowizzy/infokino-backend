import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User extends Document {
    @ApiProperty({ example: "1", description: "Уникальный идентификатор", uniqueItems: true })
        _id: ObjectId;

    @ApiProperty({ example: "test@mail.com", description: "Электронная почта", uniqueItems: true })
    @Prop({ required: true, unique: true })
        email: string;

    @ApiProperty({ example: "Username", description: "Юзернейм", uniqueItems: true })
    @Prop({ required: true, type: String, unique: true })
        username: string;

    @ApiProperty({ example: "123456789", description: "Пароль" })
    @Prop({ required: true, type: String })
        password: string;

    @ApiProperty({ example: "https://test.site/example_pic.png", description: "Ссылка на изображение" })
    @Prop({ nullable: true })
        avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);