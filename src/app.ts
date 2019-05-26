import * as hapi from 'hapi';
import jwtAuth from './auth/jwt';
import routes from './routes';
import { ApiConfig } from './config/config';
import { ResponseToolkit } from 'hapi';
import { Request } from 'hapi';
import { createUserValidator } from './model/user/validator';

interface SignInRequest extends Request {
    payload: {
        email: string;
        password: string;
    };
}

const newApp = async (config: ApiConfig): Promise<hapi.Server> => {

    const server: hapi.Server = new hapi.Server({
        host: config.host,
        port: config.port,
        app: config
    });

    server.route({
        method: 'POST',
        path: '/',
        handler: (request: SignInRequest, h: ResponseToolkit) => {
            const {email, password} = request.payload;
            return {email};
        },
        options: {
            validate: {
                payload: createUserValidator
            },
            auth: false
        }
    });

    await server.register(jwtAuth);

    server.auth.strategy('defalut', 'jwt');
    server.auth.default('defalut');

    await server.register(
        routes,
        {
            routes: {
                prefix: `/api/v${config.version}`
            }
        });

    return server;
};

export default newApp;