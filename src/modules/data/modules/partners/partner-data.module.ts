import { Module } from '@nestjs/common';
import { PersistenceCommonModule } from '../common/persistence-common.module';
import { PartnerRepositoryService } from './partner-repository.service';
import { PgDbModule } from '../../../pg-db/pg-db.module';
import { PartnerRepositoryPgImpService } from './partner-repository-pg-imp.service';

@Module({
  imports: [PersistenceCommonModule, PgDbModule],
  providers: [
    {
      provide: PartnerRepositoryService,
      useClass: PartnerRepositoryPgImpService,
    },
  ],
  exports: [PartnerRepositoryService],
})
export class PartnerDataModule {}
