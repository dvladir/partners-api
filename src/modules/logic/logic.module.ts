import { Module } from '@nestjs/common';
import { DataModule } from '../data';
import { ServiceCommonModule } from './common/service-common.module';
import { PartnerService } from './partner.service';
import { PartnerImpService } from './partner-imp.service';

@Module({
  imports: [DataModule, ServiceCommonModule],
  providers: [
    {
      provide: PartnerService,
      useClass: PartnerImpService,
    },
  ],
  exports: [PartnerService],
})
export class LogicModule {}
