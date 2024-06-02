import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User extends Document {
    _id: ObjectId;

    @Prop({ required: true, unique: true })
        email: string;

    @Prop({ required: true, unique: true, type: String })
        username: string;

    @Prop({ required: true, type: String })
        password: string;

    @Prop({ nullable: true })
        avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);