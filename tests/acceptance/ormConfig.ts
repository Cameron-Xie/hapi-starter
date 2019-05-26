import {ConnectionOptions} from 'typeorm';
import {User} from '../../src/entities/user';

const testConnectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: false,
    entities: [
        User
    ],
};

export default testConnectionOptions;