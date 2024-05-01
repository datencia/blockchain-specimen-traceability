import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    private readonly SECRET: string = this.configService.get<string>('SECRET');

    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        this.logger.verbose(`Validating user ${username}...`);
        const user = await this.usersService.findOne(username);
        // TODO investigate another approach to assign a unique password to every test-network user
        if (user && pass === this.SECRET) {
            return user;
        }
        this.logger.error(`User ${user} not found or password invalid!`);
        return null;
    }
}
