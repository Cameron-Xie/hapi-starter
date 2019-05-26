import { createConnection } from 'typeorm';
import newApp from './app';
import { apiConfig } from './config/config';


createConnection()
    .then(() => newApp(apiConfig))
    .then(async server => {
        await server.start();
        console.log('Server running on %s', server.info.uri);
    })
    .catch(console.error);