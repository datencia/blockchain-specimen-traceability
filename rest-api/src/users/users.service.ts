import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { dirExists, resolvePath } from '@core/file-utils';

// TODO This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    private readonly CRYPTO_PATH: string = this.configService.get<string>('CRYPTO_PATH');

    // prettier-ignore
    constructor(
        private readonly configService: ConfigService,
    ) {}

    async findOne(username: string): Promise<User | undefined> {
        const usernameDirPath = resolvePath(this.CRYPTO_PATH, 'users', username);
        const found = await dirExists(usernameDirPath);
        if (found) {
            return username;
        }
        this.logger.debug(`Crypto material directory for user ${username} not found!`);
        return undefined;
    }
}
