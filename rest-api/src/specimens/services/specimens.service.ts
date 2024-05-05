import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Contract, Gateway, Network } from '@hyperledger/fabric-gateway';
import { randomUUID } from 'crypto';
import * as dayjs from 'dayjs';

import { GatewayClientService } from '@common/fabric';
import { Specimen } from '../models/specimen.model';
import { CreateSpecimenDto } from '../dtos/create-specimen.dto';

@Injectable()
export class SpecimensService {
    private readonly logger = new Logger(SpecimensService.name);
    private readonly CHANNEL_NAME = this.configService.get<string>('CHANNEL_NAME');
    private readonly CHAINCODE_NAME = this.configService.get<string>('CHAINCODE_NAME');

    constructor(
        private configService: ConfigService,
        private fabricService: GatewayClientService,
    ) {}

    async initLedger(): Promise<void> {
        this.logger.log(
            'Submit Transaction: InitLedger, creates the initial set of specimens in the ledger',
        );

        const contract: Contract = await this.getContract();
        await contract.submitTransaction('InitLedger');
        this.logger.debug('InitLedger transaction committed successfully');
    }

    async getAllSpecimens(): Promise<Specimen[]> {
        this.logger.log(
            'Evaluate Transaction: getAllSpecimens, returns all the current specimens in the ledger',
        );

        const contract: Contract = await this.getContract();
        const resultBytes = await contract.evaluateTransaction('GetAllSpecimens');

        const result: Specimen[] = this.decodeResponse(resultBytes);
        this.logger.debug(`Found ${result.length} specimens in the ledger`);

        return result;
    }

    async getSpecimenById(id: string): Promise<Specimen> {
        this.logger.log('Evaluate Transaction: ReadSpecimen, returns the specimen attributes');

        const contract: Contract = await this.getContract();
        try {
            const resultBytes = await contract.evaluateTransaction('ReadSpecimen', id);

            const result: Specimen = this.decodeResponse(resultBytes);
            this.logger.debug(`Specimen with id ${id} found`);

            return result;
        } catch (err) {
            this.logger.error(`Failed getting the specimen with id ${id}, error=${err.message}`);
        }
    }

    async createSpecimen(specimenData: CreateSpecimenDto): Promise<Specimen> {
        this.logger.log(
            'Submit Transaction: RegisterExtractedSpecimen, register a new extracted specimen',
        );

        const contract: Contract = await this.getContract();
        const id = randomUUID();
        const { name, label, method, collectionTime, collector, patientId, owner } = specimenData;

        const resultBytes = await contract.submitTransaction(
            'RegisterExtractedSpecimen',
            id,
            name,
            label,
            method,
            dayjs(collectionTime).valueOf().toString(),
            collector,
            patientId,
            owner,
        );
        this.logger.debug('Transaction committed successfully');

        const specimen: Specimen = this.decodeResponse(resultBytes);
        this.logger.log(`Specimen with id ${id} created, status: ${specimen.status}`);

        return specimen;
    }

    private async getContract(): Promise<Contract> {
        const gateway: Gateway = await this.fabricService.getGateway();
        const network: Network = gateway.getNetwork(this.CHANNEL_NAME);
        return network.getContract(this.CHAINCODE_NAME);
    }

    private decodeResponse(resultBytes: Uint8Array): any {
        const utf8Decoder = new TextDecoder();
        const resultJson = utf8Decoder.decode(resultBytes);
        return JSON.parse(resultJson);
    }
}
