import { BaseError } from '@common/base-error';

export class ServiceError<
  P extends Record<string, unknown>,
> extends BaseError<P> {}
