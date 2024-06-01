import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class CreateCaseDto {
    @ApiProperty({
        example: '8acffb0a-f569-4da2-be14-6b0f6c97dbaa',
        description: 'The specimen identifier in the ledger being accessioning',
    })
    @IsNotEmpty()
    readonly specimenId: string;

    @ApiProperty({ example: '24B0000710', description: 'Identifier assigned by the laboratory' })
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'caseNumber must not be an empty string' })
    @MaxLength(255)
    readonly caseNumber: string;

    @ApiProperty({
        example: '2024-05-16T12:25:00.000Z',
        description: 'The time when specimen is received by the laboratory',
    })
    @IsNotEmpty()
    @IsDateString()
    readonly receivedTime: string;
}
