import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {Role} from "#src/guards/role-guard/role.enum";

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review extends Document {
    @ApiProperty({ example: "1", description: "Уникальный идентификатор", uniqueItems: true })
        _id: string;

    @ApiProperty({ example: 12345, description: "ID фильма" })
    @Prop({ required: true })
        movieId: number;

    @ApiProperty({ example: "Lorem ipsum dolor", description: "Комментарий" })
    @Prop({ required: true })
        comment: string;

    @ApiProperty({ example: 2.5, description: "Оценка" })
    @Prop({ required: true })
        rating: number;

    @ApiProperty({ example: "Username", description: "Юзернейм" })
    @Prop({ required: true })
        username: string;

    @ApiProperty({ example: "12345", description: "ID пользователя" })
    @Prop({ required: true })
        userId: string;

    @ApiProperty({ example: "https://test.site/example_pic.png", description: "Изображение" })
    @Prop({ nullable: true })
        avatar: string;

    @ApiProperty({ example: "USER", description: "Роль пользователя" })
    @Prop({ required: true })
        role: Role.USER;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);