import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { POOL } from './constants';

@Global()
@Module({
  providers: [
    {
      provide: POOL,
      useFactory: (config: ConfigService) => {
        const host = config.get('DB_HOST');
        const user = config.get('DB_USER');
        const password = config.get('DB_PASS');
        const database = config.get('DB_SCHEMA');
        const port = config.get<number>('DB_PORT');
        const max = config.get<number>('DB_MAX');
        const idleTimeoutMillis = config.get<number>('DB_IDLE_TIMEOUT');
        const connectionTimeoutMillis = config.get<number>(
          'DB_CONNECTION_TIMEOUT',
        );

        const pool: Pool = new Pool({
          host,
          user,
          password,
          database,
          port,
          max,
          idleTimeoutMillis,
          connectionTimeoutMillis,
        });

        return pool;
      },
      inject: [ConfigService],
    },
  ],
  exports: [POOL],
})
export class PgDbModule {}
