import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppErrors, ErrorsType } from "#src/common/errors";
import { Favorite } from "#src/modules/favorites/schemas";

@Injectable()
export class FavoritesService {
    constructor(@InjectModel(Favorite.name) private readonly favoriteModel: Model<Favorite>) {}

    async updateOrCreate(userId: string, movieId: number) {
        const record = await this.favoriteModel.findOne({ userId }).exec();

        if (record) {
            if (!record.items.includes(movieId)) {
                record.items.push(movieId);
                await record.save();
                return record;
            } else {
                record.items = record.items.filter(item => item !== movieId);
                await record.save();
                return record;
            }
        } else {
            return await this.favoriteModel.create({ userId, items: [movieId] });
        }
    }

    async remove(userId: string) {
        const record = await this.favoriteModel.findOne({ userId }).exec();

        if (!record) {
            throw new HttpException(
                {
                    message: AppErrors[ErrorsType.FAVORITES_NOT_FOUND],
                    status: HttpStatus.NOT_FOUND
                },
                HttpStatus.NOT_FOUND
            );
        }

        await this.favoriteModel.findOneAndDelete({ userId });

        return { message: "OK" };
    }

    async getItems(userId: string) {
        const favorites = await this.favoriteModel.findOne({ userId }).exec();

        if (!favorites?.items.length) {
            throw new HttpException(
                {
                    message: AppErrors[ErrorsType.FAVORITES_NOT_FOUND],
                    status: HttpStatus.NOT_FOUND
                },
                HttpStatus.NOT_FOUND
            );
        }

        return favorites.items;
    }
}