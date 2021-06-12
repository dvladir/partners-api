import { BaseError } from '@common/base-error';

export class PersistenceError<
  P extends Record<string, unknown>,
> extends BaseError<P> {}
