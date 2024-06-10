import { promises as fs } from 'fs';
import * as grpc from '@grpc/grpc-js';

import { config } from './config';

export async function createGrpcConnection(): Promise<grpc.Client> {
    console.log(`Creating new gRPC client to ${config.peerEndpoint}...`);

    const tlsRootCert = await fs.readFile(config.tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);

    return new grpc.Client(config.peerEndpoint, tlsCredentials, {
        'grpc.ssl_target_name_override': config.peerHostAlias,
    });
}
