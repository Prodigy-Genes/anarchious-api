import { DataSource } from 'typeorm';
import { District } from './src/districts/entities/district.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // This loads the .env file manually for the CLI

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [District],
  migrations: ['./src/migrations/*.ts'],
});
