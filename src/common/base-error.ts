import { ErrorMessageCode } from './error-message-code.enum';

export interface BaseErrorCtor<
  T extends BaseError<P>,
  P extends Record<string, unknown>,
> {
  new (code: ErrorMessageCode, params: P): T;
}

export class BaseError<P extends Record<string, unknown>> extends Error {
  constructor(public code: ErrorMessageCode, params?: P) {
    super(`${code}: ${Object.values(params || {}).join(', ')}`);
    this.params = params;
  }

  readonly params: P;

  convert<T extends BaseError<P>>(ctor: BaseErrorCtor<T, P>): T {
    return new ctor(this.code, this.params);
  }
}
