import { Injectable } from '@nestjs/common';
import { Pool, QueryConfig, QueryResult, QueryResultRow } from 'pg';

@Injectable()
export class PgDbService {

  // todo vad: make pool creation in a proper way
  pool: Pool = new Pool({
    host: 'localhost',
    user: 'pdb-user',
    password: 'pdb-pass',
    database: 'partners',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  async invoke<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryConfig: QueryConfig<I>,
  ): Promise<QueryResult<R>> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(queryConfig);
      client.release();
      return result;
    } catch (e) {
      client.release();
      throw e;
    }
  }
}
