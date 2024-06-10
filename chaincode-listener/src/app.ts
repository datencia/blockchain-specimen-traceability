import chalk from 'chalk';

import { config } from './config';
import { createFabricGateway } from './gateway-client';
import { decodeResponse } from './utils';

async function main() {
    const gateway = await createFabricGateway(config.username);
    const events = await gateway
        .getNetwork(config.channelName)
        .getChaincodeEvents(config.chaincodeName, {});

    console.log('Listening for contract events...');

    try {
        for await (const event of events) {
            const asset = decodeResponse(event.payload);
            console.log(
                `${chalk.bgGreen('Event Received')} ${event.eventName}\n  txId: ${event.transactionId}\n  payload:${JSON.stringify(asset)}`,
            );
        }
    } catch (err: unknown) {
        console.log(`${chalk.bgRed('Failed')} Error processing event: ${err}`);
    } finally {
        events.close();
    }
}

main();
