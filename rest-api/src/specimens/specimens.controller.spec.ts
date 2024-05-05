import { Test, TestingModule } from '@nestjs/testing';

import { SpecimensController } from './specimens.controller';
import { SpecimensService } from './services/specimens.service';

describe('SpecimensController', () => {
    let controller: SpecimensController;

    const specimensServiceProvider = {
        provide: SpecimensService,
        useValue: {
            initLedger: jest.fn(),
            getAllSpecimens: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SpecimensController],
            providers: [specimensServiceProvider],
        }).compile();

        controller = module.get<SpecimensController>(SpecimensController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
