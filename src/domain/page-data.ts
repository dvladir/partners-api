export interface PageData<T> {
  data: ReadonlyArray<T>;
  total: number;
  pageSize: number;
  pageNum: number;
  pagesCount: number;
}