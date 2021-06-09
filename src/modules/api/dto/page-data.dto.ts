import { PageData } from '@domain/page-data';

export interface PageDataDto<T> {
  data: ReadonlyArray<T>;
  total: number;
  pageSize: number;
  pageNum: number;
  pagesCount: number;
}

export const toPageDataDto = <S, T>(
  pageData: PageData<S>,
  converter: (x: S) => T,
): PageDataDto<T> => {
  const data = pageData.data.map(converter);
  const { total, pageSize, pageNum, pagesCount } = pageData;
  return { data, total, pageSize, pageNum, pagesCount };
};
