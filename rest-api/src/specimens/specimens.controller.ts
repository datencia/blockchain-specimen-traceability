import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SpecimensService } from './services/specimens.service';
import { Specimen } from './models/specimen.model';
import { CreateSpecimenDto } from './dtos/create-specimen.dto';

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

    @Post()
    @UseGuards(AuthGuard('basic'))
    async create(@Body() specimenData: CreateSpecimenDto): Promise<Specimen> {
        return this.specimensService.createSpecimen(specimenData);
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
