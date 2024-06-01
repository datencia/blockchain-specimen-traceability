import { Test, TestingModule } from '@nestjs/testing';

import { CasesController } from './cases.controller';
import { CasesService } from './services/cases.service';

describe('CasesController', () => {
    let controller: CasesController;

    const casesServiceProvider = {
        provide: CasesService,
        useValue: {
            initLedger: jest.fn(),
            getAllSpecimens: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CasesController],
            providers: [casesServiceProvider],
        }).compile();

        controller = module.get<CasesController>(CasesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
