import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SpecimensService } from './specimens.service';
import { Specimen } from './specimen.model';

@Controller('specimens')
export class SpecimensController {
    // prettier-ignore
    constructor(
        private specimensService: SpecimensService,
    ) {}

    @Get()
    @UseGuards(AuthGuard('basic'))
    async getAllSpecimens(): Promise<Specimen[]> {
        return this.specimensService.getAllSpecimens();
    }

    @Get(':id')
    @UseGuards(AuthGuard('basic'))
    async getSpecimenById(@Param('id') id: string): Promise<Specimen> {
        return this.specimensService.getSpecimenById(id);
    }

    @Post('init-ledger')
    @UseGuards(AuthGuard('basic'))
    async initLedger(): Promise<void> {
        return this.specimensService.initLedger();
    }
}
