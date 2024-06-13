import { Test, TestingModule } from '@nestjs/testing';

import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';

describe('OrdersController', () => {
    let controller: OrdersController;

    const ordersServiceProvider = {
        provide: OrdersService,
        useValue: {
            initLedger: jest.fn(),
            getAllSpecimens: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [ordersServiceProvider],
        }).compile();

        controller = module.get<OrdersController>(OrdersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
