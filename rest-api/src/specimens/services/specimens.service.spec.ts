import { Test, TestingModule } from '@nestjs/testing';

import { SpecimensService } from './specimens.service';
import { GatewayClientService } from '@common/fabric';
import { ConfigService } from '@nestjs/config';

describe('SpecimensService', () => {
    let service: SpecimensService;

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
            providers: [SpecimensService, configServiceProvider, gatewayServiceProvider],
        }).compile();

        service = module.get<SpecimensService>(SpecimensService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
