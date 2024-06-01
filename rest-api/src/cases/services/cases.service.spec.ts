import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

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

    const configServiceProvider = {
        provide: ConfigService,
        useValue: {
            get: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CasesService, configServiceProvider, gatewayServiceProvider],
        }).compile();

        service = module.get<CasesService>(CasesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
