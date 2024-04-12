import mongoose from 'mongoose';
import config from "config";
import Logger from '@/Utils/Logger';

async function Mongo() {
    const dbURI = config.get<string>('dbURI');
    try {
        await mongoose.connect(dbURI);
        Logger.database('MongoDB Connected');
    } catch (err) {
        Logger.database('Database connection error');
        process.exit(1);
    }
}

export default Mongo;