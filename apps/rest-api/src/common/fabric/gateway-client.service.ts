import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';
import {
    connect,
    Contract,
    Gateway,
    Identity,
    Network,
    Signer,
    signers,
} from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';

import { GrpcClientService } from '../grpc';
import { getFirstDirFileBuffer, resolvePath } from '../utils';

@Injectable({ scope: Scope.REQUEST })
export class GatewayClientService {
    private readonly logger = new Logger(GatewayClientService.name);
    private readonly MSP_ID: string = this.configService.get<string>('MSP_ID');
    private readonly CRYPTO_PATH: string = this.configService.get<string>('CRYPTO_PATH');
    private readonly CHANNEL_NAME = this.configService.get<string>('CHANNEL_NAME');
    private readonly CHAINCODE_NAME = this.configService.get<string>('CHAINCODE_NAME');

    private _gateway: Gateway;

    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly configService: ConfigService,
        private readonly grpcClientService: GrpcClientService,
    ) {}

    async getGateway(): Promise<Gateway> {
        if (this._gateway) {
            return this._gateway;
        }
        await this.initFabricGateway(this.request.user as string);
        return this._gateway;
    }

    async getContract(): Promise<Contract> {
        const gateway: Gateway = await this.getGateway();
        const network: Network = gateway.getNetwork(this.CHANNEL_NAME);
        return network.getContract(this.CHAINCODE_NAME);
    }

    async closeGatewayConnection(): Promise<void> {
        this.logger.verbose(`Closing Fabric gateway connection...`);
        const gateway: Gateway = await this.getGateway();
        gateway.close();
    }

    private async initFabricGateway(username: string): Promise<void> {
        this.logger.debug(`Creating new Fabric gateway connection for user ${username}...`);
        const currentDate = Date.now();
        const client = await this.grpcClientService.getClient();
        this._gateway = connect({
            client,
            identity: await this.newIdentity(username),
            signer: await this.newSigner(username),
            // Default timeouts for different gRPC calls
            evaluateOptions: () => ({ deadline: currentDate + 5000 }), // 5 seconds
            endorseOptions: () => ({ deadline: currentDate + 15000 }), // 15 seconds
            submitOptions: () => ({ deadline: currentDate + 5000 }), // 5 seconds
            commitStatusOptions: () => ({ deadline: currentDate + 60000 }), // 1 minute
        });
    }

    private async newIdentity(username: string): Promise<Identity> {
        const certDirectoryPath = this.resolveUserCredentialsPath(username, 'signcerts');
        const credentials = await getFirstDirFileBuffer(certDirectoryPath);
        return { mspId: this.MSP_ID, credentials };
    }

    private async newSigner(username: string): Promise<Signer> {
        const keyDirectoryPath = this.resolveUserCredentialsPath(username, 'keystore');
        const privateKeyPem = await getFirstDirFileBuffer(keyDirectoryPath);
        const privateKey = crypto.createPrivateKey(privateKeyPem);
        return signers.newPrivateKeySigner(privateKey);
    }

    private resolveUserCredentialsPath(username: string, type: 'signcerts' | 'keystore'): string {
        return resolvePath(this.CRYPTO_PATH, 'users', username, 'msp', type);
    }
}
