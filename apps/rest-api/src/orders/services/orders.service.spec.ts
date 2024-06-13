import { Test, TestingModule } from '@nestjs/testing';

import { OrdersService } from './orders.service';
import { GatewayClientService } from '@common/fabric';

describe('OrdersService', () => {
    let service: OrdersService;

    const gatewayServiceProvider = {
        provide: GatewayClientService,
        useValue: {
            getGateway: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrdersService, gatewayServiceProvider],
        }).compile();

        service = module.get<OrdersService>(OrdersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
