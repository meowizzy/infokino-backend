import { Injectable, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtAuthGuard } from "../../guards/auth-guard";
import { SetRecommendsDto } from "./dto/set-recommends.dto";
import { Recommends } from "./models/recommends.schema";


@UseGuards(JwtAuthGuard)
@Injectable()
export class RecommendsService {
    constructor(@InjectModel(Recommends.name) private readonly recommendModel: Model<Recommends>) {}

    async setItems(setRecommendsDto: SetRecommendsDto) {
        const isExist = await this.recommendModel.findOne({ userId: setRecommendsDto.userId });

        if (isExist) {
            isExist.items.push(...setRecommendsDto.items);
            await isExist.save();
            return isExist;
        }

        return await this.recommendModel.create(setRecommendsDto);
    }
}