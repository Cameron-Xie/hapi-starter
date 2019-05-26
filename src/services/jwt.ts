import * as jwt from 'jsonwebtoken';
import * as util from 'util';

interface Token {
    email: string;
}

const verifyPromise = util.promisify(jwt.verify);

export const signJwt = (input: string | Buffer | object, secretKey: string, options?: jwt.SignOptions): string =>
    jwt.sign(input, secretKey);

export const verifyJwt = async (token: string, secretKey: string, options?: jwt.SignOptions): Promise<Token> => {
    const decoded = await verifyPromise(token, secretKey);

    if (typeof decoded == 'string') {
        return {
            email: JSON.parse(decoded).email
        };
    }

    return <Token>decoded;
};
