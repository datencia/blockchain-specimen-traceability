import * as dotenv from 'dotenv';
import Joi from 'joi';

interface Config {
    nodeEnv: string;
    tlsCertPath: string;
    peerEndpoint: string;
    peerHostAlias: string;
    mpsId: string;
    username: string;
    cryptoPath: string;
    channelName: string;
    chaincodeName: string;
}

dotenv.config();

const envSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
    TLS_CERT_PATH: Joi.string().required(),
    PEER_ENDPOINT: Joi.string().required(),
    PEER_HOST_ALIAS: Joi.string().required(),
    MSP_ID: Joi.string().required(),
    USERNAME: Joi.string().required(),
    CRYPTO_PATH: Joi.string().required(),
    CHANNEL_NAME: Joi.string().required(),
    CHAINCODE_NAME: Joi.string().required(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const config: Config = {
    nodeEnv: envVars.NODE_ENV,
    tlsCertPath: envVars.TLS_CERT_PATH,
    peerEndpoint: envVars.PEER_ENDPOINT,
    peerHostAlias: envVars.PEER_HOST_ALIAS,
    mpsId: envVars.MSP_ID,
    username: envVars.USERNAME,
    cryptoPath: envVars.CRYPTO_PATH,
    channelName: envVars.CHANNEL_NAME,
    chaincodeName: envVars.CHAINCODE_NAME,
};
