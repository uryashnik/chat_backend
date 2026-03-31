import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { entities } from './src/common/entities';
import { migrations } from './src/common/migrations';
import config from './config';

const db = config().db;
export default new DataSource({
  type: 'postgres',
  host: db.host,
  port: +db.port!,
  username: db.username,
  password: db.password,
  database: db.database,
  synchronize: false,
  logging: true,
  migrations,
  entities,
  migrationsTableName: '_migrations',
  namingStrategy: new SnakeNamingStrategy(),
});
