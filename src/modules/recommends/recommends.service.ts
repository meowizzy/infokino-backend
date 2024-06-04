import { Injectable, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtAuthGuard } from "#src/guards/auth-guard/auth-guard";
import { Recommends } from "./models/recommends.schema";
import { SetRecommendsDto } from "./dto/set-recommends.dto";

@UseGuards(JwtAuthGuard)
@Injectable()
export class RecommendsService {
    constructor(@InjectModel(Recommends.name) private readonly recommendModel: Model<Recommends>) {}

    async setItems(userId: string, { items }: SetRecommendsDto) {
        const isExist = await this.recommendModel.findOne({ userId });

        if (isExist) {
            const set = new Set<string>([...items, ...isExist.items]);
            isExist.items = Array.from(set);
            await isExist.save();
            return isExist;
        }

        return await this.recommendModel.create({
            userId,
            items
        });
    }
}