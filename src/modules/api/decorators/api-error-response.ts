import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ErrorMessageCode } from '@common/error-message-code.enum';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiErrorResponse = <ParamsModel extends Type<any>>(
  status: HttpStatus,
  errorCode: ErrorMessageCode,
  paramsModel?: ParamsModel,
) => {
  const code = { enum: [errorCode] };
  const params = !!paramsModel
    ? { $ref: getSchemaPath(paramsModel) }
    : undefined;

  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        allOf: [
          {
            properties: { code, params },
          },
        ],
      },
    }),
  );
};
