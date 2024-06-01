import { Injectable, Logger } from '@nestjs/common';

import { Contract } from '@hyperledger/fabric-gateway';
import { randomUUID } from 'crypto';
import * as dayjs from 'dayjs';

import { GatewayClientService } from '@common/fabric';
import { Specimen } from '../models/specimen.entity';
import { CreateSpecimenDto } from '../dtos/create-specimen.dto';
import { TransferOwnershipDto } from '../dtos/transfer-ownership.dto';
import { UpdateStatusDto } from '../dtos/update-status.dto';
import { Transaction } from '../models/transaction.entity';

@Injectable()
export class SpecimensService {
    private readonly logger = new Logger(SpecimensService.name);

    // prettier-ignore
    constructor(
        private fabricService: GatewayClientService,
    ) {}

    async initLedger(): Promise<void> {
        this.logger.log(
            'Submit Transaction: InitLedger, creates the initial set of specimens in the ledger',
        );

        const contract: Contract = await this.fabricService.getContract();

        try {
            await contract.submitTransaction('InitLedger');
            this.logger.debug('InitLedger transaction committed successfully');
        } catch (err) {
            this.logger.error(
                `Failed creating the initial set of specimens in the ledger, error=${err.message}`,
            );
            throw err;
        } finally {
            await this.fabricService.closeGatewayConnection();
        }
    }

    async getAllSpecimens(): Promise<Specimen[]> {
        this.logger.log(
            'Evaluate Transaction: getAllSpecimens, returns all the current specimens in the ledger',
        );

        const contract: Contract = await this.fabricService.getContract();

        try {
            const resultBytes = await contract.evaluateTransaction('GetAllSpecimens');

            let specimenList: Specimen[] = this.decodeResponse(resultBytes);
            this.logger.debug(`Found ${specimenList.length} specimens in the ledger`);
            specimenList = specimenList.map(this.mapRawSpecimenToSpecimenEntity);

            return specimenList;
        } catch (err) {
            this.logger.error(`Failed getting all specimens in the ledger, error=${err.message}`);
            throw err;
        } finally {
            await this.fabricService.closeGatewayConnection();
        }
    }

    async getSpecimenById(id: string): Promise<Specimen> {
        this.logger.log('Evaluate Transaction: ReadSpecimen, returns the specimen attributes');

        const contract: Contract = await this.fabricService.getContract();

        try {
            const resultBytes = await contract.evaluateTransaction('ReadSpecimen', id);

            let specimen: Specimen = this.decodeResponse(resultBytes);
            this.logger.debug(`Specimen with id ${id} found`);
            specimen = this.mapRawSpecimenToSpecimenEntity(specimen);

            return specimen;
        } catch (err) {
            this.logger.error(`Failed getting the specimen with id ${id}, error=${err.message}`);
            throw err;
        } finally {
            await this.fabricService.closeGatewayConnection();
        }
    }

    async getSpecimenHistoryById(id: string): Promise<Transaction<Specimen>[]> {
        this.logger.log(
            'Evaluate Transaction: ReadSpecimenHistory, returns the specimen transaction history',
        );

        const contract: Contract = await this.fabricService.getContract();

        try {
            const resultBytes = await contract.evaluateTransaction('ReadSpecimenHistory', id);

            const transactions: Transaction<Specimen>[] = this.decodeResponse(resultBytes);
            this.logger.debug(
                `Found ${transactions.length} transactions for the specimen with id ${id}`,
            );

            return transactions
                .map((transaction) => ({
                    ...transaction,
                    timestamp: dayjs(transaction.timestamp).toISOString(),
                }))
                .map((transaction) => {
                    if (!transaction.data) {
                        return transaction;
                    }
                    return {
                        ...transaction,
                        data: this.mapRawSpecimenToSpecimenEntity(transaction.data),
                    };
                });
        } catch (err) {
            this.logger.error(
                `Failed getting the transaction history for the specimen with id ${id}, error=${err.message}`,
            );
            throw err;
        } finally {
            await this.fabricService.closeGatewayConnection();
        }
    }

    async createSpecimen(specimenData: CreateSpecimenDto): Promise<Specimen> {
        this.logger.log(
            'Submit Transaction: RegisterExtractedSpecimen, register a new extracted specimen',
        );

        const contract: Contract = await this.fabricService.getContract();

        try {
            const id = randomUUID();
            const { name, label, method, collectionTime, collector, patientId, owner } =
                specimenData;

            const resultBytes = await contract.submitTransaction(
                'RegisterExtractedSpecimen',
                id,
                name,
                label,
                method,
                dayjs(collectionTime).valueOf().toString(),
                collector,
                owner,
                patientId,
            );
            this.logger.debug('Transaction committed successfully');

            let specimen: Specimen = this.decodeResponse(resultBytes);
            this.logger.log(`Specimen with id ${id} created, status: ${specimen.status}`);
            specimen = this.mapRawSpecimenToSpecimenEntity(specimen);

            return specimen;
        } catch (err) {
            this.logger.error(`Failed creating the new specimen, error=${err.message}`);
            throw err;
        } finally {
            await this.fabricService.closeGatewayConnection();
        }
    }

    async deleteSpecimenById(id: string): Promise<void> {
        this.logger.log('Submit Transaction: DeleteSpecimen, deletes the given specimen');

        const contract: Contract = await this.fabricService.getContract();

        try {
            await contract.submitTransaction('DeleteSpecimen', id);
            this.logger.debug(`Specimen with id ${id} deleted successfully`);
        } catch (err) {
            this.logger.error(`Failed deleting the specimen with id ${id}, error=${err.message}`);
            throw err;
        } finally {
            await this.fabricService.closeGatewayConnection();
        }
    }

    async transferSpecimen(transferData: TransferOwnershipDto): Promise<Specimen> {
        this.logger.log('Submit Transaction: TransferSpecimen, transfer a specimen between users');

        const contract: Contract = await this.fabricService.getContract();
        const { specimenId, senderId, recipientId } = transferData;

        try {
            const resultBytes = await contract.submitTransaction(
                'TransferSpecimen',
                specimenId,
                senderId,
                recipientId,
            );
            let specimen = this.decodeResponse(resultBytes);
            this.logger.log(
                `Specimen with id ${specimenId} transferred from user ${senderId} to ${recipientId}`,
            );
            specimen = this.mapRawSpecimenToSpecimenEntity(specimen);

            return specimen;
        } catch (err) {
            this.logger.error(
                `Failed transferring the specimen with id ${specimenId} from user ${senderId} to ${recipientId}, error=${err.message}`,
            );
            throw err;
        } finally {
            await this.fabricService.closeGatewayConnection();
        }
    }

    async updateSpecimenStatus(id: string, statusData: UpdateStatusDto): Promise<Specimen> {
        this.logger.log(
            'Submit Transaction: ChangeSpecimenStatus, update the status of a given specimen',
        );

        const contract: Contract = await this.fabricService.getContract();

        try {
            const resultBytes = await contract.submitTransaction(
                'ChangeSpecimenStatus',
                id,
                statusData.status,
            );
            let specimen = this.decodeResponse(resultBytes);
            this.logger.log(`Specimen ${id} status updated to ${statusData.status}`);
            specimen = this.mapRawSpecimenToSpecimenEntity(specimen);

            return specimen;
        } catch (err) {
            this.logger.error(`Failed updating the specimen with id ${id}, error=${err.message}`);
            throw err;
        } finally {
            await this.fabricService.closeGatewayConnection();
        }
    }

    private decodeResponse(resultBytes: Uint8Array): any {
        const utf8Decoder = new TextDecoder();
        const resultJson = utf8Decoder.decode(resultBytes);
        return JSON.parse(resultJson);
    }

    private mapRawSpecimenToSpecimenEntity(rawSpecimen: any): Specimen {
        let specimen: Specimen = {
            ...rawSpecimen,
            collectionTime: dayjs(rawSpecimen.collectionTime).toISOString(),
        };

        if (rawSpecimen.receivedTime) {
            specimen = {
                ...specimen,
                receivedTime: dayjs(specimen.receivedTime).toISOString(),
            };
        }

        return specimen;
    }
}
