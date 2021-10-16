import { SortField } from '@domain/sort-field';
import { SortType } from '@domain/sort-type.enum';
import { ApiError } from '../../services/api-error';
import { ErrorMessageCode } from '@common/error-message-code.enum';

export class SortDto {
  constructor(public sort?: string) {}

  static fromDto<T extends string>(dto: SortDto): SortField<T> {
    const sort = dto.sort || '';
    const parts = sort.split(';');

    if (!parts[0]) {
      return undefined;
    }

    const field = parts[0] as T;

    let sortType: SortType;

    if (parts[1]) {
      if (parts[1] !== SortType.asc && parts[1] !== SortType.desc) {
        throw new ApiError(ErrorMessageCode.INVALID_PARAMETER);
      }
      sortType = parts[1] as SortType;
    } else {
      sortType = SortType.asc;
    }

    return { field, sortType };
  }

  static toDto<T>(v: SortField<T>): SortDto {
    let sort: string | undefined = undefined;
    if (v.field) {
      sort = [v.field, v.sortType].join(';');
    }
    return new SortDto(sort);
  }
}
