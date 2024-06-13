import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@users';
import { AuthService } from './auth.service';
import { HttpBasicStrategy } from './http-basic.strategy';

@Module({
    imports: [ConfigModule, PassportModule, UsersModule],
    providers: [AuthService, HttpBasicStrategy],
})
export class AuthModule {}
