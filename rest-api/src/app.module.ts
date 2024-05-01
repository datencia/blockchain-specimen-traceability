import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configOptions } from './config';
import { CommonModule } from '@common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        UsersModule,
        AuthModule,
        CommonModule,
    ],
})
export class AppModule {}
