import { registerAs } from '@nestjs/config';
import * as env from 'env-var';
import { DatabaseConfigEnum } from '../enums';

export default registerAs(DatabaseConfigEnum.MYSQL_CONFIG, () => ({
  type: env.get(DatabaseConfigEnum.DB_TYPE).required().asEnum([DatabaseConfigEnum.MYSQL_TYPE]),
  host: env.get(DatabaseConfigEnum.DB_HOST).required().asString(),
  port: env.get(DatabaseConfigEnum.DB_PORT).required().asPortNumber(),
  username: env.get(DatabaseConfigEnum.DB_USER).required().asString(),
  password: env.get(DatabaseConfigEnum.DB_PASSWORD).required().asString(),
  database: env.get(DatabaseConfigEnum.DB_NAME).required().asString(),
  synchronize: env.get(DatabaseConfigEnum.DB_SYNC).default('false').required().asBool(),
  logging: env.get(DatabaseConfigEnum.DB_LOGGING).default('false').required().asBool(),
  extra: {
    connectionLimit: env.get(DatabaseConfigEnum.DB_CONNECTION_LIMIT).default('100').required().asInt(),
  },
  retryAttempts: env.get(DatabaseConfigEnum.DB_RETRY_ATTEMPTS).default('5').required().asInt(),
  retryDelay: env.get(DatabaseConfigEnum.DB_RETRY_DELAY).default('100').required().asInt(),
}));
