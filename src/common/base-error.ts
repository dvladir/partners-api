import { ErrorMessageCode } from './error-message-code.enum';

export interface BaseErrorCtor<T extends BaseError> {
  new (code: ErrorMessageCode, ...params: unknown[]): T;
}

export class BaseError extends Error {
  constructor(public code: ErrorMessageCode, ...params: unknown[]) {
    super(`${code}: ${params.join(', ')}`);
    this.params = params;
  }

  readonly params: unknown[];

  convert<T extends BaseError>(ctor: BaseErrorCtor<T>): T {
    return new ctor(this.code, ...this.params);
  }
}
