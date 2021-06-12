import { ErrorInfo } from '@domain/error-info';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

type ErrorInfoDtoChildren<T> = { [key in keyof T]?: ErrorInfoDto<T[key]> };

export class ErrorInfoDto<T> {
  constructor(errors?: string[], children?: ErrorInfoDtoChildren<T>) {
    this.errors = errors;
    this.children = children;
  }

  @ApiProperty({ type: 'array', items: { type: 'string' } })
  errors?: string[];

  @ApiProperty({
    type: 'object',
    additionalProperties: { $ref: getSchemaPath(ErrorInfoDto) },
    example: {
      children: {
        firstName: { errors: ['required'] },
        lastName: { errors: ['required'] },
        address: { children: { city: { errors: ['required'] } } },
      },
    },
  })
  children?: ErrorInfoDtoChildren<T>;

  static toDto<T>(error: ErrorInfo<T>): ErrorInfoDto<T> {
    const errors = !error.errors ? undefined : [...error.errors];
    let children: ErrorInfoDtoChildren<T> | undefined = undefined;
    if (error.children) {
      const keys = Object.keys(error.children);
      children = keys.reduce((res, key) => {
        res[key] = this.toDto(error.children[key]);
        return res;
      }, {} as ErrorInfoDtoChildren<T>);
    }
    if (errors || children) {
      const result = new ErrorInfoDto(errors, children);
      return result;
    }
    return undefined;
  }
}
