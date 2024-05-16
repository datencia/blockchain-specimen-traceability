import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LoggerModule } from 'nestjs-pino';

import { configOptions } from '@config';
import { CommonModule } from '@common';
import { RequestIdMiddleware } from '@common/middlewares';
import { loggerOptionsFactory } from '@common/logger';
import { UsersModule } from '@users';
import { AuthModule } from '@auth';
import { SpecimensModule } from '@specimens';

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        LoggerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: loggerOptionsFactory,
        }),
        UsersModule,
        AuthModule,
        CommonModule,
        SpecimensModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestIdMiddleware).forRoutes('*');
    }
}
