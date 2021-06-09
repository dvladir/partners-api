import { Module } from '@nestjs/common';
import { PersistenceErrorHandlerService } from './services/persistence-error-handler.service';

@Module({
  providers: [PersistenceErrorHandlerService],
  exports: [PersistenceErrorHandlerService],
})
export class PersistenceCommonModule {}
