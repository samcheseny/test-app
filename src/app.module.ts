import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { WinstonModule } from 'nest-winston';
import { getLoggerOptions } from './winston.logger';
import { UserService } from './service/user.service';
import * as process from 'process';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      envFilePath: `src/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: false,
      poolSize: 3,
      useUTC: true,
      subscribers: [],
    }),
    WinstonModule.forRoot(
      getLoggerOptions(process.env.NODE_ENV, process.env.LOG_LEVEL || 'info'),
    ),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, Logger],
  exports: [TypeOrmModule],
})
export class AppModule {}
