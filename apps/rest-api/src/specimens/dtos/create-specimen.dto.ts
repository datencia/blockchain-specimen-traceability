import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';

import { CollectionMethod } from '../models/collection-method.enum';

export class CreateSpecimenDto {
    @ApiProperty({ example: 'Skin', description: 'The specimen name' })
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @ApiProperty({ example: 'B24-00017-A', description: 'Identifier assigned by the collector' })
    @IsNotEmpty()
    @MaxLength(255)
    label: string;

    @ApiProperty({
        example: 'Biopsy',
        description: 'Method used to perform collection (e.g. biopsy, cytology, aspiration, etc.)',
    })
    @IsNotEmpty()
    @IsEnum(CollectionMethod)
    method: CollectionMethod;

    @ApiProperty({ example: '2024-05-15T14:30:50.000Z', description: 'Collection date & time' })
    @IsNotEmpty()
    @IsDateString()
    collectionTime: string;

    @ApiProperty({ example: 'Practitioner/1', description: 'Who collected the specimen' })
    @IsNotEmpty()
    @MaxLength(255)
    collector: string;

    @ApiProperty({ example: 'Patient/1', description: 'The patient the specimen comes from' })
    @IsNotEmpty()
    @MaxLength(255)
    patientId: string;

    @ApiProperty({
        example: 'Practitioner/1',
        description: 'The person who currently holds the specimen',
    })
    @IsNotEmpty()
    @MaxLength(255)
    owner: string;
}
