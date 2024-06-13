import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class TransferOwnershipDto {
    @ApiProperty({
        example: '8acffb0a-f569-4da2-be14-6b0f6c97dbaa',
        description: 'The specimen identifier in the ledger being transferred',
    })
    @IsNotEmpty()
    specimenId: string;

    @ApiProperty({
        example: 'Practitioner/1',
        description: 'Current owner of the specimen initiating the transfer',
    })
    @IsNotEmpty()
    senderId: string;

    @ApiProperty({
        example: 'Practitioner/2',
        description: 'Identifier of the user receiving the specimen',
    })
    @IsNotEmpty()
    recipientId: string;
}
