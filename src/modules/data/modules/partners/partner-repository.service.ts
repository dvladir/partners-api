import { Repository } from '../common/repository';
import { PartnerPredicate } from './partner-predicate';
import { PartnerInfo } from '@domain/partner-info';
import { PageData } from '@domain/page-data';
import { SortField } from '@domain/sort-field';
import { PartnerSortableFields } from '@domain/partner-sortable-fields.enum';

export abstract class PartnerRepositoryService
  implements Repository<PartnerInfo, PartnerPredicate, PartnerSortableFields> {
  abstract add(v: Omit<PartnerInfo, 'id'>): Promise<{ id: string }>;

  abstract find(predicate: PartnerPredicate): Promise<PartnerInfo>;

  abstract findAll(params: {
    pageNum: number;
    pageSize: number;
    predicate?: PartnerPredicate;
    sort?: SortField<PartnerSortableFields>;
  }): Promise<PageData<PartnerInfo>>;

  abstract remove(v: Pick<PartnerInfo, 'id'>): Promise<unknown>;

  abstract update(v: PartnerInfo): Promise<unknown>;
}
