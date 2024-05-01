import { Test, TestingModule } from '@nestjs/testing';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { GatewayClientService } from './gateway-client.service';
import { GrpcClientService } from '@common/grpc';

describe('GatewayClientService', () => {
    let service: GatewayClientService;

    const requestProvider = {
        provide: REQUEST,
        useValue: {
            get: jest.fn(),
        },
    };

    const configServiceProvider = {
        provide: ConfigService,
        useValue: {
            get: jest.fn(),
        },
    };

    const grpcClientServiceProvider = {
        provide: GrpcClientService,
        useValue: {
            getClient: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GatewayClientService,
                configServiceProvider,
                grpcClientServiceProvider,
                requestProvider,
            ],
        }).compile();

        service = module.get<GatewayClientService>(GatewayClientService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
