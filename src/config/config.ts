import { ServerOptionsApp } from 'hapi';

export interface ApiConfig extends ServerOptionsApp {
    host: string;
    port: number;
    version: number;
    secretKey: string;
    saltRounds: number;
}

export const apiConfig: ApiConfig = {
    host: process.env.API_HOST,
    port: Number(process.env.API_PORT),
    version: Number(process.env.API_VERSION),
    secretKey: process.env.SECRET_KEY,
    saltRounds: Number(process.env.SALT_ROUNDS)
};