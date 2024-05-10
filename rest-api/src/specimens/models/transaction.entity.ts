import { ApiProperty } from '@nestjs/swagger';

export class Transaction<T> {
    @ApiProperty({
        example: '8acffb0a-f569-4da2-be14-6b0f6c97dbaa',
        description: 'The transaction ID of the event',
    })
    txId: string;

    @ApiProperty({ example: false, description: 'Indicates whether the key has been deleted' })
    isDelete: boolean;

    @ApiProperty({
        example: '2024-05-11T08:29:33.734Z',
        description: 'The time at which the modification occurred',
    })
    timestamp: string;

    @ApiProperty({
        description: 'The value associated with the key at the time of the modification',
    })
    data?: T;
}
