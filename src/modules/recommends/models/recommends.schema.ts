import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export type RecommendsDocument = Recommends & Document;

@Schema()
export class Recommends extends Document {
    @Prop({ required: true })
    @ApiProperty({ example: "12345", description: "ID Пользователя", uniqueItems: true })
        userId: string;

    @Prop({ required: true })
    @ApiProperty({ example: "[Триллер, Семейные, Боевик]", description: "Список жанров", nullable: true })
        items: string[];
}

export const RecommendsSchema = SchemaFactory.createForClass(Recommends);