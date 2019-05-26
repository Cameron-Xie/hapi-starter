import * as hapi from 'hapi';
import newApp from '../../src/app';
import {createConnection} from 'typeorm';
import {testConfig} from './app-config';
import testConnectionOptions from './ormConfig';


const testServer = async (): Promise<hapi.Server> =>
    await createConnection(testConnectionOptions)
        .then(() => newApp(testConfig));


export default testServer;