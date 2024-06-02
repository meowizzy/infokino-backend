import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review extends Document {
    _id: string;

    @Prop({ required: true })
        movieId: number;

    @Prop({ required: true })
        comment: string;

    @Prop({ required: true })
        rating: number;

    @Prop({ required: true })
        username: string;

    @Prop({ required: true })
        userId: string;

    @Prop({ nullable: true })
        avatar: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);