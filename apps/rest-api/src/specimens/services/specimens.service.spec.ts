import { Test, TestingModule } from '@nestjs/testing';

import { SpecimensService } from './specimens.service';
import { GatewayClientService } from '@common/fabric';

describe('SpecimensService', () => {
    let service: SpecimensService;

    const gatewayServiceProvider = {
        provide: GatewayClientService,
        useValue: {
            getGateway: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SpecimensService, gatewayServiceProvider],
        }).compile();

        service = module.get<SpecimensService>(SpecimensService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
