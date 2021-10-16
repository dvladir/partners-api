import { PageData } from '@domain/page-data';
import { PartnerInfo } from '@domain/partner-info';
import { SortField } from '@domain/sort-field';
import { PartnerSortableFields } from '@domain/partner-sortable-fields.enum';

export abstract class PartnerService {
  abstract searchPartners(
    search: string,
    pageNum: number,
    pageSize: number,
    sort?: SortField<PartnerSortableFields>,
  ): Promise<PageData<PartnerInfo>>;
  abstract getPartnerById(id: string): Promise<PartnerInfo>;
  abstract removePartner(id: string): Promise<unknown>;
  abstract updatePartner(v: PartnerInfo): Promise<unknown>;
  abstract addPartner(v: Omit<PartnerInfo, 'id'>): Promise<{ id: string }>;
}
