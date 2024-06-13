import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { OrdersService } from './services/orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    // prettier-ignore
    constructor(
        private ordersService: OrdersService,
    ) {}

    @Post()
    @HttpCode(204)
    @UseGuards(AuthGuard('basic'))
    @ApiOperation({ summary: 'Create a laboratory order for a given specimen' })
    async createSpecimenOrder(@Body() orderData: CreateOrderDto): Promise<void> {
        await this.ordersService.createOrder(orderData);
    }
}
