import { ErrorInfo } from '@domain/error-info';

type ErrorInfoDtoChildren<T> = { [key in keyof T]?: ErrorInfoDto<T[key]> };

export interface ErrorInfoDto<T> {
  errors?: string[];
  children?: ErrorInfoDtoChildren<T>;
}

export const toErrorInfoDto = <T>(error: ErrorInfo<T>): ErrorInfoDto<T> => {
  const errors = !error.errors ? undefined : [...error.errors];
  let children: ErrorInfoDtoChildren<T> | undefined = undefined;
  if (error.children) {
    const keys = Object.keys(error.children);
    children = keys.reduce((res, key) => {
      res[key] = toErrorInfoDto(error.children[key]);
      return res;
    }, {} as ErrorInfoDtoChildren<T>);
  }
  if (errors || children) {
    return { errors, children };
  }
  return undefined;
};
