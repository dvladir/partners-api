import { PageData } from '@domain/page-data';

export const getPage = <T>(
  source: ReadonlyArray<T>,
  pageNum: number,
  pageSize: number,
): PageData<T> => {
  const data = source.slice(pageNum * pageSize, pageNum * pageSize + pageSize);
  const total = source.length;
  const pagesCount = Math.floor(
    total / pageSize + (total % pageSize === 0 ? 0 : 1),
  );
  return {
    data,
    total,
    pagesCount,
    pageNum,
    pageSize,
  };
};
