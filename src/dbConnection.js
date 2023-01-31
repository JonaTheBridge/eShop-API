import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const { MONGO_DB_NAME, MONGO_URL } = process.env;

const connectionConfig = { dbName: MONGO_DB_NAME, autoIndex: true };
mongoose.set('strictQuery', true);
const connection = mongoose.connect(MONGO_URL, connectionConfig);

if (connection) {
  console.info('Connection with mongo database successfully');
} else {
  console.error('Error to connect with mongo database');
}
