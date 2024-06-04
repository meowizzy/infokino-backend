import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {
    @ApiProperty({ example: "dfa121tggeafa124dfa1", description: "ID пользователя" })
    @Prop({ required: true })
        userId: string;

    @ApiProperty({ example: "[12345,54321,12345,54212]", description: "Список фильмов" })
    @Prop({ required: true })
        items: number[];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);