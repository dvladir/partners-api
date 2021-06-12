import { BaseError } from '@common/base-error';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessageCode } from '@common/error-message-code.enum';

export type MessageStatusMap = Partial<Record<ErrorMessageCode, HttpStatus>>;

const DEFAULT_MESSAGE_STATUS_MAP: MessageStatusMap = {
  [ErrorMessageCode.PARTNER_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorMessageCode.INVALID_PARTNER_TYPE]: HttpStatus.BAD_REQUEST,
  [ErrorMessageCode.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
};

export class ApiError<P extends Record<string, unknown>> extends BaseError<P> {
  convertToHttpException(
    messageStatusMap: MessageStatusMap = {},
  ): HttpException {
    const statusMap = { ...DEFAULT_MESSAGE_STATUS_MAP, ...messageStatusMap };
    const status = statusMap[this.code] || HttpStatus.INTERNAL_SERVER_ERROR;

    const response = {
      code: this.code,
      params: this.params,
    };

    return new HttpException(response, status);
  }
}
