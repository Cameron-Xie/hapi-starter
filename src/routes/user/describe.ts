import { Request, ResponseToolkit } from 'hapi';

export default async (request: Request, h: ResponseToolkit) =>
    h.response({user: {email: request.auth.credentials.user}}).code(200);
