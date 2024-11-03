import * as process from 'process';

export enum NodeEnv {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export interface AppConfig {
  port: number;
  logLevel: string;
  requestTimeout: number;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  url: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password: string;
}

export interface EnvironmentVariables {
  nodeEnv: NodeEnv;
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
}

export default (): EnvironmentVariables => {
  let currentEnv;
  switch (process.env.NODE_ENV) {
    case NodeEnv.DEVELOPMENT:
      currentEnv = NodeEnv.DEVELOPMENT;
      break;
    case NodeEnv.STAGING:
      currentEnv = NodeEnv.STAGING;
      break;
    default:
      currentEnv = NodeEnv.PRODUCTION;
      break;
  }

  return {
    app: {
      port: parseInt(process.env.PORT),
      logLevel: process.env.LOG_LEVEL,
      requestTimeout: parseInt(process.env.REQUEST_TIMEOUT),
    },
    database: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      name: process.env.POSTGRES_DB,
      url: process.env.DATABASE_URL,
    },
    nodeEnv: currentEnv,
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    },
  };
};
