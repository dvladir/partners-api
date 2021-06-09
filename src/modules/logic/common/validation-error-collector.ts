import { ErrorInfo, ErrorInfoChildren } from '@domain/error-info';

export class ValidationErrorCollector<T> {
  private _errors: string[];

  private _childrenBuilders: {
    [key in keyof T]?: ValidationErrorCollector<T[key]>;
  };

  addErrors(...errors: string[]): void {
    this._errors = [...(this._errors || []), ...errors];
  }

  child<Property extends keyof T>(
    k: Property,
  ): ValidationErrorCollector<T[Property]> {
    if (!this._childrenBuilders) {
      this._childrenBuilders = {};
    }

    if (!this._childrenBuilders[k]) {
      this._childrenBuilders[k] = new ValidationErrorCollector();
    }

    return this._childrenBuilders[k];
  }

  collect(): ErrorInfo<T> | undefined {
    const errors = !this._errors ? undefined : [...this._errors];
    let children: ErrorInfoChildren<T> = undefined;
    if (this._childrenBuilders) {
      const keys = Object.keys(this._childrenBuilders) as (keyof T)[];

      children = keys.reduce((res, key) => {
        const err = this._childrenBuilders[key].collect();
        if (err) {
          res[key] = err;
        }
        return res;
      }, {} as ErrorInfoChildren<T>);

      if (Object.keys(children).length === 0) {
        children = undefined;
      }
    }

    if (errors || children) {
      return { errors, children };
    }

    return undefined;
  }
}
