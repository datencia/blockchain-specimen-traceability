import { promises as fs } from 'fs';
import * as path from 'path';

export async function getFirstDirFileName(dirPath: string): Promise<string> {
    const files = await fs.readdir(dirPath);
    return path.join(dirPath, files[0]);
}

export async function getFirstDirFileBuffer(dirPath: string): Promise<Buffer> {
    const certPath = await getFirstDirFileName(dirPath);
    return await fs.readFile(certPath);
}

export function resolvePath(...paths: string[]): string {
    return path.resolve(...paths);
}
