import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class CreateOrderDto {
    @ApiProperty({
        example: '8acffb0a-f569-4da2-be14-6b0f6c97dbaa',
        description: 'The specimen identifier in the ledger being ordered',
    })
    @IsNotEmpty()
    readonly specimenId: string;

    @ApiProperty({
        example: '384858',
        description: 'The order number associated with the specimen',
    })
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'orderNumber must not be an empty string' })
    @MaxLength(255)
    readonly orderNumber: string;
}
