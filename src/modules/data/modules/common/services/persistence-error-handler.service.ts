import { ErrorHandler } from '@common/error-handler';
import { Injectable } from '@nestjs/common';
import { PersistenceError } from '../persistence-error';
import { ErrorMessageCode } from '@common/error-message-code.enum';

@Injectable()
export class PersistenceErrorHandlerService implements ErrorHandler {
  handleError(e: Error): void {
    if (e instanceof PersistenceError) {
      throw e;
    }
    console.log(e);
    throw new PersistenceError(ErrorMessageCode.INTERNAL_ERROR);
  }
}
