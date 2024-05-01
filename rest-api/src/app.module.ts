import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configOptions } from '@config';
import { CommonModule } from '@common';
import { UsersModule } from '@users';
import { AuthModule } from '@auth';

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        UsersModule,
        AuthModule,
        CommonModule,
    ],
})
export class AppModule {}
