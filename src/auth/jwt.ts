import { Lifecycle, Plugin, Request, ResponseToolkit, Server, ServerAuthSchemeOptions } from 'hapi';
import Boom = require('boom');
import { verifyJwt } from '../services/jwt';
import { ApiConfig } from '../config/config';


const register = async (server: Server): Promise<void> => {

    server.auth.scheme('jwt', (server: Server, options: ServerAuthSchemeOptions) => ({
        authenticate: async (request: Request, h: ResponseToolkit): Promise<Lifecycle.ReturnValue> => {
            const {secretKey} = <ApiConfig>request.server.settings.app;
            if (!secretKey) {
                throw 'secret key is not provided';
            }

            try {
                const token = request.headers['authorization'];
                const decoded = await verifyJwt(token, secretKey);

                return h.authenticated({credentials: {user: decoded.email}});
            } catch (e) {
                throw Boom.unauthorized('invalid token');
            }
        }
    }));
};

const plugin: Plugin<null> = ({
    register,
    name: 'TestPlugin'
});

export default plugin;