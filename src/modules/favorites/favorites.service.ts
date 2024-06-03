import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Favorite } from "./schemas";
import { AppErrors, ErrorsType } from "../../common/errors";


@Injectable()
export class FavoritesService {
    constructor(@InjectModel(Favorite.name) private readonly favoriteModel: Model<Favorite>) {}

    async toggle() {

    }

    async getList(userId: string) {
        const { items } = await this.favoriteModel.findOne({ userId }).exec();

        if (!items.length) {
            throw new HttpException(
                {
                    message: AppErrors[ErrorsType.FAVORITES_NOT_FOUND],
                    status: HttpStatus.NOT_FOUND
                },
                HttpStatus.NOT_FOUND
            );
        }

        return ;
    }
}