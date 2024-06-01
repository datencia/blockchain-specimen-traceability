import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNotEmpty } from 'class-validator';

import { SpecimenStatus } from '@specimens/models/specimen-status.type';

export class UpdateStatusDto {
    @ApiProperty({
        description: 'The new status for the specimen',
        enum: Object.values(SpecimenStatus),
        example: 'GROSSING',
    })
    @IsNotEmpty()
    @IsEnum(SpecimenStatus)
    status: SpecimenStatus;
}
