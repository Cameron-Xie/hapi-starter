import { Plugin, Server } from 'hapi';
import signIn from './auth/sign-in';
import signUp from './auth/sign-up';
import describe from './user/describe';
import { createUserValidator } from '../model/user/validator';


const register = async (server: Server): Promise<void> => {
    server.route({
        method: 'POST',
        path: '/sign-in',
        handler: signIn,
        options: {
            auth: false
        }
    });

    server.route({
        method: 'POST',
        path: '/sign-up',
        handler: signUp,
        options: {
            validate: {
                payload: createUserValidator,
                failAction: ((request, h, err) => {
                    return h.response({error: err.message}).code(400).takeover();
                })
            },
            auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/user/describe',
        handler: describe
    });
};

const plugin: Plugin<void> = {
    register,
    name: 'Routes'
};


export default plugin;