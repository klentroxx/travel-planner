import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import databaseConfig from './database.config';

const configService = new ConfigService(databaseConfig());

export default new DataSource({
  type: 'mysql',
  host: configService.get('host'),
  port: configService.get('port'),
  username: configService.get('username'),
  password: configService.get('password'),
  database: configService.get('database'),
  migrations: ['./src/database/migrations/**/*.{ts,js}'],
  entities: ['./src/database/entities/**/*.{ts,js}'],
});
