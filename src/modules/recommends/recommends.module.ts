import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RecommendsController } from "./recommends.controller";
import { RecommendsService } from "./recommends.service";
import { Recommends, RecommendsSchema } from "./models/recommends.schema";

@Module({
    controllers: [RecommendsController],
    providers: [RecommendsService],
    imports: [MongooseModule.forFeature([{ name: Recommends.name, schema: RecommendsSchema }])]
})
export class RecommendsModule {}