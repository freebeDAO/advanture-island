import { Module } from '@nestjs/common';
import { NodeModule } from './NodeModule';
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import { Node } from '../entity/Node'

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.DB_TYPE as 'mysql' | 'mariadb',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_HOST_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: process.env.DB_IS_SYN == "true", // true for dev
        logging: process.env.DB_IS_LOGGING == "true",
        entities: [Node],
        extra: {
          connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
          queueLimit: Number(process.env.DB_QUEUE_LIMIT),
          waitForConnections: process.env.DB_WAIT_CONNECTION == "true",
        }
      })
    }),
    NodeModule,
  ],
})
export class MainModule { }