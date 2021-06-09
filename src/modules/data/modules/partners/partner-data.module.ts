import { Module } from '@nestjs/common';
import { PersistenceCommonModule } from '../common/persistence-common.module';
import { PartnerRepositoryService } from './partner-repository.service';
import { PartnerRepositoryImpService } from './partner-repository-imp.service';

@Module({
  imports: [PersistenceCommonModule],
  providers: [
    {
      provide: PartnerRepositoryService,
      useClass: PartnerRepositoryImpService,
    },
  ],
  exports: [PartnerRepositoryService],
})
export class PartnerDataModule {}
