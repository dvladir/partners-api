export type ErrorInfoChildren<T> = {
  [key in keyof T]?: ErrorInfo<T[key]>;
};

export interface ErrorInfo<T> {
  errors?: string[];
  children?: ErrorInfoChildren<T>;
}