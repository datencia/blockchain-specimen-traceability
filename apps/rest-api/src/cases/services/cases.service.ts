import { Injectable, Logger } from '@nestjs/common';

import { Contract } from '@hyperledger/fabric-gateway';
import * as dayjs from 'dayjs';

import { GatewayClientService } from '@common/fabric';
import { CreateCaseDto } from '../dtos/create-case.dto';

@Injectable()
export class CasesService {
    private readonly logger = new Logger(CasesService.name);

    // prettier-ignore
    constructor(
        private fabricService: GatewayClientService,
    ) {}

    async createLabCase(caseData: CreateCaseDto): Promise<void> {
        this.logger.log(
            'Submit Transaction: RegisterLabCase, create a laboratory case for a given specimen',
        );

        const contract: Contract = await this.fabricService.getContract();
        const { specimenId, caseNumber, receivedTime } = caseData;

        try {
            await contract.submitTransaction(
                'RegisterLabCase',
                specimenId,
                caseNumber,
                dayjs(receivedTime).valueOf().toString(),
            );
            this.logger.log(`Case ${caseNumber} created for specimen with id ${specimenId}`);
        } catch (err) {
            this.logger.error(
                `Failed creating the case ${caseNumber} for the specimen with id ${specimenId}, error=${err.message}`,
            );
            throw err;
        } finally {
            await this.fabricService.closeGatewayConnection();
        }
    }
}
