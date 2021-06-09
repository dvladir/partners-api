import { Repository } from '../common/repository';
import { PartnerPredicate } from './partner-predicate';
import { PartnerInfo } from '@domain/partner-info';
import { PageData } from '@domain/page-data';

export abstract class PartnerRepositoryService
  implements Repository<PartnerInfo, PartnerPredicate>
{
  abstract add(v: Omit<PartnerInfo, 'id'>): Promise<{ id: string }>;

  abstract find(predicate: PartnerPredicate): Promise<PartnerInfo>;

  abstract findAll(params: {
    pageNum: number;
    pageSize: number;
    predicate?: PartnerPredicate;
    sort?: string;
  }): Promise<PageData<PartnerInfo>>;

  abstract remove(v: Pick<PartnerInfo, 'id'>): Promise<unknown>;

  abstract update(v: PartnerInfo): Promise<unknown>;
}
