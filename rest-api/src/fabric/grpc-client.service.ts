import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { promises as fs } from 'fs';
import * as grpc from '@grpc/grpc-js';

@Injectable()
export class GrpcClientService {
    private _client: grpc.Client;

    private readonly tlsCertPath: string = this.configService.get<string>('TLS_CERT_PATH');
    private readonly peerEndpoint: string = this.configService.get<string>('PEER_ENDPOINT');
    private readonly peerHostAlias: string = this.configService.get<string>('PEER_HOST_ALIAS');

    // prettier-ignore
    constructor(
        private configService: ConfigService,
    ) {}

    async getClient(): Promise<grpc.Client> {
        if (this._client) {
            return this._client;
        }
        this._client = await this.initGrpcConnection();
        return this._client;
    }

    private async initGrpcConnection(): Promise<grpc.Client> {
        const tlsRootCert = await fs.readFile(this.tlsCertPath);
        const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
        return new grpc.Client(this.peerEndpoint, tlsCredentials, {
            'grpc.ssl_target_name_override': this.peerHostAlias,
        });
    }
}
