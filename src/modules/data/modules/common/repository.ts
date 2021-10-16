import { PageData } from '@domain/page-data';
import { SortField } from '@domain/sort-field';

export interface Repository<T, P, FE> {
  add(v: T): Promise<{ id: string }>;

  update(v: T): Promise<unknown>;

  remove(v: T): Promise<unknown>;

  find(predicate: P): Promise<T>;

  findAll(params: {
    pageNum: number;
    pageSize: number;
    predicate?: P;
    sort?: SortField<FE>;
  }): Promise<PageData<T>>;
}
