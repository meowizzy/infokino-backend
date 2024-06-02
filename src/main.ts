import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle("infokino API")
        .setDescription("Документация REST API")
        .setVersion("1.0.0")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT);
}

start();
