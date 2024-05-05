import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configOptions } from '@config';
import { CommonModule } from '@common';
import { RequestIdMiddleware } from '@common/middlewares';
import { UsersModule } from '@users';
import { AuthModule } from '@auth';
import { SpecimensModule } from '@specimens';

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
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
