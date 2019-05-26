import { Request, ResponseToolkit } from 'hapi';
import { getRepository } from 'typeorm';
import { User } from '../../entities/user';
import { comparePassword } from '../../model/user/password';
import { signJwt } from '../../services/jwt';
import { ApiConfig } from '../../config/config';

interface SignInRequest extends Request {
    payload: {
        email: string;
        password: string;
    };
}

export default async (request: SignInRequest, h: ResponseToolkit) => {
    const {email, password} = request.payload;
    const {secretKey} = <ApiConfig>request.server.settings.app;

    const user = await getRepository(User).findOne({email});

    if (user && await comparePassword(password, user.password)) {
        return h.response({token: signJwt({email: user.email}, secretKey)}).code(200);
    }

    return h.response({message: 'invalid username or password'}).code(400);
};
