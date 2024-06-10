import { promises as fs } from 'fs';
import path from 'path';

import { config } from './config';

export function decodeResponse(resultBytes: Uint8Array): any {
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    return JSON.parse(resultJson);
}

export async function getFirstDirFileName(dirPath: string): Promise<string> {
    const files = await fs.readdir(dirPath);
    return path.join(dirPath, files[0]);
}

export async function getFirstDirFileBuffer(dirPath: string): Promise<Buffer> {
    const certPath = await getFirstDirFileName(dirPath);
    return await fs.readFile(certPath);
}

export function resolveUserCredentialsPath(
    username: string,
    type: 'signcerts' | 'keystore',
): string {
    return resolvePath(config.cryptoPath, 'users', username, 'msp', type);
}

export function resolvePath(...paths: string[]): string {
    return path.resolve(...paths);
}
