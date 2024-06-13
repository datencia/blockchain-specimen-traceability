import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';

import { SpecimensService } from './services/specimens.service';
import { Specimen } from './models/specimen.entity';
import { CreateSpecimenDto } from './dtos/create-specimen.dto';
import { TransferOwnershipDto } from './dtos/transfer-ownership.dto';
import { UpdateStatusDto } from './dtos/update-status.dto';
import { Transaction } from './models/transaction.entity';

@ApiTags('Specimens')
@Controller('specimens')
export class SpecimensController {
    // prettier-ignore
    constructor(
        private specimensService: SpecimensService,
    ) {}

    @Get()
    @UseGuards(AuthGuard('basic'))
    @ApiOperation({ summary: 'Get all the current specimens stored in the ledger' })
    @ApiOkResponse({
        description: 'Return all specimens stored in the ledger',
        type: Specimen,
        isArray: true,
    })
    async getAllSpecimens(): Promise<Specimen[]> {
        return await this.specimensService.getAllSpecimens();
    }

    @Post()
    @UseGuards(AuthGuard('basic'))
    @ApiOperation({ summary: 'Create a new extracted specimen in the ledger' })
    @ApiCreatedResponse({
        description: 'The specimen has been created successfully',
        type: Specimen,
    })
    async create(@Body() specimenData: CreateSpecimenDto): Promise<Specimen> {
        return await this.specimensService.createSpecimen(specimenData);
    }

    @Get(':id')
    @UseGuards(AuthGuard('basic'))
    @ApiOperation({ summary: 'Get a specimen from the ledger by id' })
    @ApiParam({ name: 'id', type: String, description: 'Id of the specimen to return' })
    @ApiOkResponse({
        description: 'Return the requested specimen',
        type: Specimen,
    })
    async getSpecimenById(@Param('id') id: string): Promise<Specimen> {
        return await this.specimensService.getSpecimenById(id);
    }

    @Get(':id/history')
    @UseGuards(AuthGuard('basic'))
    @ApiOperation({ summary: 'Get the specimen transaction history from the ledger by id' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'Id of the specimen to return the transaction history',
    })
    @ApiOkResponse({
        description: 'Return the requested specimen transaction history',
        type: Transaction<Specimen>,
        isArray: true,
    })
    async getSpecimenHistoryById(@Param('id') id: string): Promise<Transaction<Specimen>[]> {
        return await this.specimensService.getSpecimenHistoryById(id);
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(AuthGuard('basic'))
    @ApiOperation({ summary: 'Delete the given specimen from the ledger' })
    @ApiParam({ name: 'id', type: String, description: 'Specimen id to delete' })
    @ApiNoContentResponse({ description: 'The specimen has been deleted successfully' })
    async deleteSpecimenById(@Param('id') id: string): Promise<void> {
        await this.specimensService.deleteSpecimenById(id);
    }

    @Post('transfer')
    @HttpCode(200)
    @UseGuards(AuthGuard('basic'))
    @ApiOperation({ summary: 'Transfer a specimen between users' })
    @ApiOkResponse({
        description: 'Return the specimen updated',
        type: Specimen,
    })
    async transferSpecimen(@Body() payload: TransferOwnershipDto): Promise<Specimen> {
        return await this.specimensService.transferSpecimen(payload);
    }

    @Put(':id/status')
    @HttpCode(200)
    @UseGuards(AuthGuard('basic'))
    @ApiOperation({ summary: 'Update the status of a given specimen' })
    @ApiOkResponse({
        description: 'Return the specimen updated',
        type: Specimen,
    })
    async updateSpecimenStatus(
        @Param('id') id: string,
        @Body() payload: UpdateStatusDto,
    ): Promise<Specimen> {
        return await this.specimensService.updateSpecimenStatus(id, payload);
    }

    @Post('init-ledger')
    @HttpCode(204)
    @UseGuards(AuthGuard('basic'))
    @ApiOperation({ summary: 'Create the initial set of specimens in the ledger' })
    @ApiNoContentResponse({ description: 'Ledger populated with an initial set of specimens' })
    async initLedger(): Promise<void> {
        await this.specimensService.initLedger();
    }
}
