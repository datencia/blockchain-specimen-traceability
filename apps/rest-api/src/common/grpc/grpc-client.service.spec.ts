import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { GrpcClientService } from './grpc-client.service';

describe('GrpcClientService', () => {
    let service: GrpcClientService;

    const configServiceProvider = {
        provide: ConfigService,
        useValue: {
            get: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GrpcClientService, configServiceProvider],
        }).compile();

        service = module.get<GrpcClientService>(GrpcClientService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
