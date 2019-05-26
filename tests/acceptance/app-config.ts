import { apiConfig, ApiConfig } from '../../src/config/config';

export const testConfig: ApiConfig = {
    ...apiConfig,
    port: 9090,
    secretKey: 'secret-key'
};