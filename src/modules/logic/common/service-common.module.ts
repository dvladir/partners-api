import { Module } from '@nestjs/common';
import { ServiceErrorHandlerService } from './service-error-handler.service';
import { ErrorHandler } from '@common/error-handler';

@Module({
  providers: [
    {
      provide: ErrorHandler,
      useClass: ServiceErrorHandlerService,
    },
  ],
  exports: [ErrorHandler],
})
export class ServiceCommonModule {}
