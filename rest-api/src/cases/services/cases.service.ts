import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Contract, Gateway, Network } from '@hyperledger/fabric-gateway';
import * as dayjs from 'dayjs';

import { GatewayClientService } from '@common/fabric';
import { CreateCaseDto } from '../dtos/create-case.dto';

@Injectable()
export class CasesService {
    private readonly logger = new Logger(CasesService.name);
    private readonly CHANNEL_NAME = this.configService.get<string>('CHANNEL_NAME');
    private readonly CHAINCODE_NAME = this.configService.get<string>('CHAINCODE_NAME');

    constructor(
        private configService: ConfigService,
        private fabricService: GatewayClientService,
    ) {}

    async createLabCase(caseData: CreateCaseDto): Promise<void> {
        this.logger.log(
            'Submit Transaction: RegisterLabCase, create a laboratory case for a given specimen',
        );

        const contract: Contract = await this.getContract();
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
            await this.closeGatewayConnection();
        }
    }

    private async getContract(): Promise<Contract> {
        const gateway: Gateway = await this.fabricService.getGateway();
        const network: Network = gateway.getNetwork(this.CHANNEL_NAME);
        return network.getContract(this.CHAINCODE_NAME);
    }

    private async closeGatewayConnection(): Promise<void> {
        this.logger.verbose(`Closing Fabric gateway connection...`);
        const gateway: Gateway = await this.fabricService.getGateway();
        gateway.close();
    }
}
