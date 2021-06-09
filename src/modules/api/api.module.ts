import { Module } from '@nestjs/common';
import { LogicModule } from '../logic/logic.module';
import { PartnerController } from './partner.controller';
import { ErrorHandler } from '@common/error-handler';
import { ApiErrorHandlerService } from './services/api-error-handler.service';

@Module({
  imports: [LogicModule],
  controllers: [PartnerController],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ApiErrorHandlerService,
    },
  ],
})
export class ApiModule {}
