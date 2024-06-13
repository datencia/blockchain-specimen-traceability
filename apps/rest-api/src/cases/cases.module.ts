import { Module } from '@nestjs/common';

import { CasesController } from './cases.controller';
import { CasesService } from './services/cases.service';

@Module({
    controllers: [CasesController],
    providers: [CasesService],
})
export class CasesModule {}
