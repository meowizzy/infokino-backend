import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {
    @Prop({ required: true })
        userId: string;

    @Prop({ required: true })
        items: number[];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);