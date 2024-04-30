import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
    PORT: Joi.number().port().default(3000),
    TLS_CERT_PATH: Joi.string().required(),
    PEER_ENDPOINT: Joi.string().required(),
    PEER_HOST_ALIAS: Joi.string().required(),
    MSP_ID: Joi.string().required(),
    CRYPTO_PATH: Joi.string().required(),
    SECRET: Joi.string().default('s3cr3t'),
});

export const validationOptions = {
    allowUnknown: true,
    abortEarly: true,
};
