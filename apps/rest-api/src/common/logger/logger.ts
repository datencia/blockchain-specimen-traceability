import { ConfigService } from '@nestjs/config';

import { Request } from 'express';

import { REQUEST_ID_HEADER } from '@common/middlewares';
import { Params } from 'nestjs-pino';

const targetOptions = {
    file: {
        target: 'pino/file',
        options: {
            destination: `./logs/application-${process.pid}.log`,
            mkdir: true,
        },
    },
    console: {
        target: 'pino-pretty',
        options: {
            singleLine: true,
        },
    },
};

export const loggerOptionsFactory = (configService: ConfigService): Params => {
    const nodeEnv = configService.get<string>('NODE_ENV');

    const loggingLevel = configService.get<string>('LOGGING_LEVEL');
    const isProduction = nodeEnv === 'production';
    const loggingTransports = configService
        .get<string>('LOGGING_TRANSPORTS')
        .split(',')
        .filter((transport) => targetOptions[transport] !== undefined);
    const includeFileTarget = loggingTransports.findIndex((value) => value === 'file') !== -1;
    const includeConsoleTarget = loggingTransports.findIndex((value) => value === 'console') !== -1;

    const targets = [];

    if (includeFileTarget) {
        targets.push(targetOptions.file);
    }

    if (includeConsoleTarget || !isProduction) {
        targets.push(targetOptions.console);
    }

    return {
        pinoHttp: {
            level: loggingLevel,
            transport: {
                targets,
            },
            customProps: (req: Request) => {
                return {
                    requestId: req[REQUEST_ID_HEADER],
                };
            },
            redact: ['req.headers.authorization'],
        },
    };
};
