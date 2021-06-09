import { ErrorHandler } from '@common/error-handler';
import { Injectable } from '@nestjs/common';
import { ErrorMessageCode } from '@common/error-message-code.enum';
import { ApiError, MessageStatusMap } from './api-error';
import { BaseError } from '@common/base-error';

@Injectable()
export class ApiErrorHandlerService implements ErrorHandler {
  handleError(e: Error, messageStatusMap?: MessageStatusMap): void {
    if (e instanceof ApiError) {
      throw e.convertToHttpException(messageStatusMap);
    }

    console.log(e);

    if (e instanceof BaseError) {
      throw e.convert(ApiError).convertToHttpException(messageStatusMap);
    }

    throw new ApiError(ErrorMessageCode.INTERNAL_ERROR).convertToHttpException(
      messageStatusMap,
    );
  }
}
