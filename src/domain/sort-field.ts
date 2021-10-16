import { SortType } from '@domain/sort-type.enum';

export interface SortField<FieldEnum extends any> {
  field: FieldEnum;
  sortType: SortType;
}
