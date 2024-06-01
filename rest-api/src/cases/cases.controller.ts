import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CasesService } from './services/cases.service';
import { CreateCaseDto } from './dtos/create-case.dto';

@ApiTags('Cases')
@Controller('cases')
export class CasesController {
    // prettier-ignore
    constructor(
        private casesService: CasesService,
    ) {}

    @Post()
    @HttpCode(204)
    @UseGuards(AuthGuard('basic'))
    @ApiOperation({ summary: 'Create a laboratory case for a given specimen' })
    async createLabCase(@Body() payload: CreateCaseDto): Promise<void> {
        await this.casesService.createLabCase(payload);
    }
}
