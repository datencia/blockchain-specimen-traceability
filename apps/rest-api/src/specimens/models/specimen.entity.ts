import { ApiProperty } from '@nestjs/swagger';

import { CollectionMethod } from './collection-method.enum';
import { SpecimenStatus } from './specimen-status.type';

export class Specimen {
    @ApiProperty({
        example: '8acffb0a-f569-4da2-be14-6b0f6c97dbaa',
        description: 'The specimen identifier in the ledger',
    })
    id: string;

    @ApiProperty({ example: 'Skin', description: 'The specimen name' })
    name: string;

    @ApiProperty({ example: 'B24-00017-A', description: 'Identifier assigned by the collector' })
    label: string;

    @ApiProperty({
        example: 'Biopsy',
        description: 'Method used to perform collection (e.g. biopsy, cytology, aspiration, etc.)',
    })
    method: CollectionMethod;

    @ApiProperty({ example: '2024-05-15T14:30:50.000Z', description: 'Collection date & time' })
    collectionTime: string;

    @ApiProperty({ example: 'Practitioner/1', description: 'Who collected the specimen' })
    collector: string;

    @ApiProperty({ example: 'Patient/1', description: 'The patient the specimen comes from' })
    patientId: string;

    @ApiProperty({ example: 'EXTRACTED', description: 'The current specimen status' })
    status: SpecimenStatus;

    @ApiProperty({
        example: 'Practitioner/1',
        description: 'The person who currently holds the specimen',
    })
    owner: string;

    @ApiProperty({
        example: '384858',
        description: 'The order number associated with the specimen',
    })
    orderNumber?: string;

    @ApiProperty({ example: '24B0000710', description: 'Identifier assigned by the laboratory' })
    caseNumber?: string;

    @ApiProperty({
        example: '2024-05-16T12:25:00.000Z',
        description: 'The time when specimen is received by the laboratory',
    })
    receivedTime?: string;
}
