import request from 'supertest';
import testServer from '../../server';
import { getRepository } from 'typeorm';
import { User } from '../../../../src/entities/user';
import * as hapi from 'hapi';

const url = '/api/v1/sign-up';
let server: hapi.Server;

beforeAll(async () => {
    server = await testServer();
});

afterAll(async () => {
    await server.stop();
});

describe(`POST ${url}`, () => {
    it('should save user into database and return 201', async () => {
        const email = 'test@example.com';

        const res = await request(server.listener)
            .post(url)
            .send({email, password: 'password'})
            .expect(201)
            .expect('Content-Type', /json/);

        expect(res.body.email).toBe(email);

        await deleteUser(email);

    });
});

describe(`POST ${url}`, () => {
    it('should return 400 if invalid email.', async () => {
        const email = 'random_invalid_email';

        await request(server.listener)
            .post(url)
            .send({email, password: 'password'})
            .expect(400)
            .expect('Content-Type', /json/);
    });
});

describe(`POST ${url}`, () => {
    it('should return 400 if invalid password.', async () => {
        const email = 'test@example.com';

        await request(server.listener)
            .post(url)
            .send({email, password: '123'})
            .expect(400)
            .expect('Content-Type', /json/);
    });
});


const deleteUser = async (email: string) => await getRepository(User).delete({email});