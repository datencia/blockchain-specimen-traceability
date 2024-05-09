import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService: ConfigService = app.get(ConfigService);

    app.setGlobalPrefix('api');
    app.use(helmet());
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const isSwaggerEnabled = configService.get<boolean>('SWAGGER_ENABLED');
    if (isSwaggerEnabled) {
        const options = new DocumentBuilder()
            .setTitle('Specimens API')
            .setDescription('The specimens blockchain-based API')
            .setVersion('1.0')
            .addTag(
                'Specimens',
                'Operations to interact with the chaincode for specimen traceability management in Hyperledger Fabric.',
            )
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('explorer', app, document);
    }

    await app.listen(configService.get<number>('PORT'));
}
bootstrap();
