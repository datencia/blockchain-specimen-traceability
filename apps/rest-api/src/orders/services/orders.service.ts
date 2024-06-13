import { Injectable, Logger } from '@nestjs/common';

import { Contract } from '@hyperledger/fabric-gateway';

import { GatewayClientService } from '@common/fabric';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);

    // prettier-ignore
    constructor(
        private fabricService: GatewayClientService,
    ) {}

    async createOrder(orderData: CreateOrderDto): Promise<void> {
        this.logger.log(
            'Submit Transaction: IssueOrderToTheLab, create a laboratory order for a given specimen',
        );

        const contract: Contract = await this.fabricService.getContract();
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
            await this.fabricService.closeGatewayConnection();
        }
    }
}
