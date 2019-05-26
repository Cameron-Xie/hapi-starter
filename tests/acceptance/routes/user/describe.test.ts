import request from 'supertest';
import testServer from '../../server';
import { testConfig } from '../../app-config';
import { signJwt } from '../../../../src/services/jwt';
import * as hapi from 'hapi';
import { getRepository } from 'typeorm';
import { User } from '../../../../src/entities/user';
import { hashPassword } from '../../../../src/model/user/password';
import { v4 as uuidV4 } from 'uuid';

const url = '/api/v1/user/describe';
const email = 'test@example.com';
const password = 'password';
let server: hapi.Server;

beforeAll(async () => {
    server = await testServer();
    await createUser(email, password);
});

afterAll(async () => {
    await deleteUser(email);
    await server.stop();
});

describe(`GET ${url}`, () => {
    it('should describe user with valid JWT', async () => {
        const token = await signJwt({email}, testConfig.secretKey);

        const res = await request(server.listener)
            .get(url)
            .set({Authorization: token})
            .expect(200)
            .expect('Content-Type', /json/);

        expect(res.body.user.email).toBe(email);
    });
});


describe(`GET ${url}`, () => {
    it('should return 401 with invalid JWT', async () => {
        const token = await signJwt({email}, 'random_secret');

        await request(server.listener)
            .get(url)
            .set({Authorization: token})
            .expect(401)
            .expect('Content-Type', /json/);
    });
});


const createUser = async (email: string, password: string) => await getRepository(User).save({
    id: uuidV4(),
    email,
    password: await hashPassword(password, testConfig.saltRounds)
});

const deleteUser = async (email: string) => await getRepository(User).delete({email});