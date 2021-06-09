import { ErrorHandler } from '@common/error-handler';
import { Injectable } from '@nestjs/common';
import { ServiceError } from './service-error';
import { ErrorMessageCode } from '@common/error-message-code.enum';
import { BaseError } from '@common/base-error';

@Injectable()
export class ServiceErrorHandlerService implements ErrorHandler {
  handleError(e: Error): void {
    if (e instanceof ServiceError) {
      throw e;
    }

    console.log(e);

    if (e instanceof BaseError) {
      throw e.convert(ServiceError);
    }

    throw new ServiceError(ErrorMessageCode.INTERNAL_ERROR);
  }
}
