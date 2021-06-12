import { PageData } from '@domain/page-data';
import { ApiProperty } from '@nestjs/swagger';

export class PageDataDto<T> {
  constructor(data: Partial<PageData<T>> = {}) {
    this.data = data.data || [];
    this.total = data.total || 0;
    this.pageSize = data.pageSize || 0;
    this.pageNum = data.pageNum || 0;
    this.pagesCount = data.pagesCount || 0;
  }

  @ApiProperty()
  data: ReadonlyArray<T>;

  @ApiProperty()
  total: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  pageNum: number;

  @ApiProperty()
  pagesCount: number;

  static toDto<S, T>(
    pageData: PageData<S>,
    converter: (x: S) => T,
  ): PageDataDto<T> {
    const data = pageData.data.map(converter);
    return new PageDataDto<T>({ ...pageData, data });
  }
}
