import { PageData } from '@domain/page-data';

export interface Repository<T, P> {
  add(v: T): Promise<{ id: string }>;

  update(v: T): Promise<unknown>;

  remove(v: T): Promise<unknown>;

  find(predicate: P): Promise<T>;

  findAll(params: {
    pageNum: number;
    pageSize: number;
    predicate?: P;
    sort?: string;
  }): Promise<PageData<T>>;
}
