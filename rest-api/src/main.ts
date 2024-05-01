import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService: ConfigService = app.get(ConfigService);

    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(helmet());

    await app.listen(configService.get<number>('PORT'));
}
bootstrap();
