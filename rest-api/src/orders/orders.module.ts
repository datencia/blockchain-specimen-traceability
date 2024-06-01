import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
    imports: [ConfigModule],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
