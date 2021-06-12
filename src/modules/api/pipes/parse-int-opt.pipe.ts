import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntOptPipe implements PipeTransform {
  constructor(private _defaultValue: number) {}

  transform(value: string, metadata: ArgumentMetadata): number {
    let result: number = parseFloat(value);
    result = isNaN(result) ? this._defaultValue : result;
    return result;
  }
}
