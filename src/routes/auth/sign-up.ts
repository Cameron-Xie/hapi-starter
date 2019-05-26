import { Request, ResponseToolkit } from 'hapi';
import { getRepository } from 'typeorm';
import { User } from '../../entities/user';
import { v4 as uuidV4 } from 'uuid';
import { hashPassword } from '../../model/user/password';
import { apiConfig } from '../../config/config';

interface SignUpRequest extends Request {
    payload: {
        email: string;
        password: string;
    };
}

export default async (request: SignUpRequest, h: ResponseToolkit) => {
    const {email, password} = request.payload;

    const user = {id: uuidV4(), email, password: await hashPassword(password, apiConfig.saltRounds)};

    await getRepository(User).save(user);

    return h.response({email: user.email}).code(201);
};