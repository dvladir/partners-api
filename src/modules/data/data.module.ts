import { Module } from '@nestjs/common';
import { PartnerDataModule } from './modules/partners';

@Module({
  imports: [PartnerDataModule],
  exports: [PartnerDataModule],
})
export class DataModule {}
