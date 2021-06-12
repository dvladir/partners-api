import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from './api-error-response';
import { ErrorMessageCode } from '@common/error-message-code.enum';

export const ApiInternalErrorResponse = () => {
  return applyDecorators(
    ApiErrorResponse(
      HttpStatus.INTERNAL_SERVER_ERROR,
      ErrorMessageCode.INTERNAL_ERROR,
    )
  );
};
