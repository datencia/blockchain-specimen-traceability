import { Injectable, NestMiddleware } from '@nestjs/common';

import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

export const REQUEST_ID_HEADER = 'X-Request-Id';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const requestId = req.get(REQUEST_ID_HEADER) ?? randomUUID();
        req[REQUEST_ID_HEADER] = requestId;
        res.set(REQUEST_ID_HEADER, requestId);
        next();
    }
}
