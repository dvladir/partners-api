import { Module } from '@nestjs/common';
import { PgDbService } from './pg-db.service';

@Module({
  providers: [PgDbService],
  exports: [PgDbService],
})
export class PgDbModule {}
