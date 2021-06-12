import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from './api-error-response';
import { ErrorMessageCode } from '@common/error-message-code.enum';
import { ErrorInfoDto } from '../dto/common/error-info-dto';

export const ApiValidationErrorResponse = () => {
  return applyDecorators(
    ApiErrorResponse(
      HttpStatus.BAD_REQUEST,
      ErrorMessageCode.VALIDATION_ERROR,
      ErrorInfoDto,
    ),
  );
};
