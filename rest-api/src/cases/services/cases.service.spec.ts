import { Test, TestingModule } from '@nestjs/testing';

import { CasesService } from './cases.service';
import { GatewayClientService } from '@common/fabric';

describe('CasesService', () => {
    let service: CasesService;

    const gatewayServiceProvider = {
        provide: GatewayClientService,
        useValue: {
            getGateway: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CasesService, gatewayServiceProvider],
        }).compile();

        service = module.get<CasesService>(CasesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
