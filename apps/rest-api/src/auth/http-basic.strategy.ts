import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { BasicStrategy } from 'passport-http';

import { AuthService } from './auth.service';

@Injectable()
export class HttpBasicStrategy extends PassportStrategy(BasicStrategy) {
    constructor(private authService: AuthService) {
        super(
            async (username: string, password: string, done: (error: any, user?: any) => void) => {
                try {
                    const user = await this.validate(username, password);
                    done(null, user);
                } catch (err) {
                    done(null, false);
                }
            },
        );
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
