import { Injectable, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtAuthGuard } from "#src/guards/auth-guard/auth-guard";
import { Recommends, RecommendsDocument } from "./models/recommends.schema";
import { SetRecommendsDto } from "./dto/set-recommends.dto";

@UseGuards(JwtAuthGuard)
@Injectable()
export class RecommendsService {
    constructor(@InjectModel(Recommends.name) private readonly recommendModel: Model<Recommends>) {}

    async setItems(userId: string, { items }: SetRecommendsDto) {
        const userRecommends = await this.recommendModel.findOne({ userId });

        if (userRecommends) {
            userRecommends.items = items;

            await userRecommends.save();
            return userRecommends;
        }

        return await this.recommendModel.create({
            userId,
            items
        });
    }

    async getItems(userId: string): Promise<RecommendsDocument> {
        return await this.recommendModel.findOne({ userId }).exec();
    }
}