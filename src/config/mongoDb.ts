import * as mongoose from 'mongoose';
import logger from '../lib/logger';

async function connectToDatabase(env) {
    try {
        await mongoose.connect(env.dbConnString);
        logger.info('connected to  database');

    } catch (error) {
        logger.info(`Error in connecting database ${error}`);
    }


}

export default connectToDatabase;