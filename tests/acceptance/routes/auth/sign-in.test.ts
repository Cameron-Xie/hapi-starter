import request from 'supertest';
import testServer from '../../server';
import { getRepository } from 'typeorm';
import { User } from '../../../../src/entities/user';
import { hashPassword } from '../../../../src/model/user/password';
import { testConfig } from '../../app-config';
import { v4 as uuidV4 } from 'uuid';
import { verifyJwt } from '../../../../src/services/jwt';
import * as hapi from 'hapi';

const url = '/api/v1/sign-in';
let server: hapi.Server;

beforeAll(async () => {
    server = await testServer();
});

afterAll(async () => {
    await server.stop();
});

describe(`POST ${url}`, () => {
    it('should return JWT by valid email and password', async () => {
        const email = 'test@example.com';
        const password = 'password';

        await createUser(email, password);

        const res = await request(server.listener)
            .post(url)
            .send({email, password})
            .expect(200)
            .expect('Content-Type', /json/);

        await deleteUser(email);

        const token = await verifyJwt(res.body.token, testConfig.secretKey);

        expect(token.email).toBe(email);

    });
});

describe(`POST ${url}`, () => {
    it('should return 400 if email or password is invalid', async () => {
        const email = 'test@example.com';
        const password = 'password';

        await createUser(email, password);

        await request(server.listener)
            .post(url)
            .send({email, password: 'random_password'})
            .expect(400)
            .expect('Content-Type', /json/);


        await request(server.listener)
            .post(url)
            .send({email: 'e@e.com', password})
            .expect(400)
            .expect('Content-Type', /json/);

        await deleteUser(email);
    });
});


const createUser = async (email: string, password: string) => await getRepository(User).save({
    id: uuidV4(),
    email,
    password: await hashPassword(password, testConfig.saltRounds)
});

const deleteUser = async (email: string) => await getRepository(User).delete({email});