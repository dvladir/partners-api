export abstract class ErrorHandler {
  abstract handleError(e: Error, ...other: unknown[]): void;
}
