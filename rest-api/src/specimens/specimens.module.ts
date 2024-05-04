import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SpecimensService } from './specimens.service';
import { SpecimensController } from './specimens.controller';

@Module({
    imports: [ConfigModule],
    providers: [SpecimensService],
    controllers: [SpecimensController],
})
export class SpecimensModule {}
