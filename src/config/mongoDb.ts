import * as mongoDB from 'mongodb';
import logger from '../lib/logger';
import { DB_CONNECTED } from '../messages';

async function connectToDatabase(env) {
   
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(env.dbConnString);

    await client.connect();

    const db: mongoDB.Db = client.db(env.dbName);

    logger.info(DB_CONNECTED);
}

export default connectToDatabase;