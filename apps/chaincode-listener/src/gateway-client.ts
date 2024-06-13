import { connect, Gateway, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import crypto from 'crypto';

import { createGrpcConnection } from './grpc-client';
import { config } from './config';
import { getFirstDirFileBuffer, resolveUserCredentialsPath } from './utils';

async function newIdentity(username: string): Promise<Identity> {
    const certDirectoryPath = resolveUserCredentialsPath(username, 'signcerts');
    const credentials = await getFirstDirFileBuffer(certDirectoryPath);
    return { mspId: config.mpsId, credentials };
}

async function newSigner(username: string): Promise<Signer> {
    const keyDirectoryPath = resolveUserCredentialsPath(username, 'keystore');
    const privateKeyPem = await getFirstDirFileBuffer(keyDirectoryPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

export async function createFabricGateway(username: string): Promise<Gateway> {
    console.log(`Creating new Fabric gateway connection for user ${username}...`);
    const currentDate = Date.now();
    const client = await createGrpcConnection();
    return connect({
        client,
        identity: await newIdentity(username),
        signer: await newSigner(username),
        // Default timeouts for different gRPC calls
        evaluateOptions: () => ({ deadline: currentDate + 5000 }), // 5 seconds
        endorseOptions: () => ({ deadline: currentDate + 15000 }), // 15 seconds
        submitOptions: () => ({ deadline: currentDate + 5000 }), // 5 seconds
        commitStatusOptions: () => ({ deadline: currentDate + 60000 }), // 1 minute
    });
}
