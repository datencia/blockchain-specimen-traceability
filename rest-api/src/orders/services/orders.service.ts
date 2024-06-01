import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Contract, Gateway, Network } from '@hyperledger/fabric-gateway';

import { GatewayClientService } from '@common/fabric';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);
    private readonly CHANNEL_NAME = this.configService.get<string>('CHANNEL_NAME');
    private readonly CHAINCODE_NAME = this.configService.get<string>('CHAINCODE_NAME');

    constructor(
        private configService: ConfigService,
        private fabricService: GatewayClientService,
    ) {}

    async createOrder(orderData: CreateOrderDto): Promise<void> {
        this.logger.log(
            'Submit Transaction: IssueOrderToTheLab, create a laboratory order for a given specimen',
        );

        const contract: Contract = await this.getContract();
        const { specimenId, orderNumber } = orderData;

        try {
            await contract.submitTransaction('IssueOrderToTheLab', specimenId, orderNumber);
            this.logger.log(`Order ${orderNumber} set for specimen with id ${specimenId}`);
        } catch (err) {
            this.logger.error(
                `Failed setting the order ${orderNumber} for the specimen with id ${specimenId}, error=${err.message}`,
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
