import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageDataDto } from '../dto/common/page-data.dto';

export const ApiPaginatedResponse = <Model extends Type<any>>(model: Model) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(PageDataDto),
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
