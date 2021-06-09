import { PartnerRepositoryService } from './partner-repository.service';
import { Injectable } from '@nestjs/common';
import { PartnerInfo } from '@domain/partner-info';
import {
  PartnerPredicate,
  PartnerPredicateById,
  PartnerPredicateBySearchString,
} from './partner-predicate';
import { PageData } from '@domain/page-data';
import { PartnerType } from '@domain/partner-type.enum';
import { PersistenceError } from '../common/persistence-error';
import { ErrorMessageCode } from '@common/error-message-code.enum';
import { nanoid } from 'nanoid';
import { PARTNER_STORE } from './partner-store';
import { getPage } from '../common/get-page';

const createPredicate = (p: PartnerPredicate) => (x: PartnerInfo) => {
  if (p instanceof PartnerPredicateById) {
    return x.id === p.id;
  }

  if (p instanceof PartnerPredicateBySearchString) {
    const searchString = (p.searchString || '').toLowerCase().trim();
    if (!searchString) {
      return true;
    }

    let pSearch =
      x.partnerType === PartnerType.naturalPerson
        ? `${x.personalInfo.firstName}${x.personalInfo.lastName}${x.personalInfo.middleName}`
        : x.companyInfo.name;

    pSearch = `${pSearch}${x.contactInfo.email}`;

    pSearch = pSearch.toLowerCase().trim();

    return pSearch.includes(searchString);
  }

  return false;
};

@Injectable()
export class PartnerRepositoryImpService implements PartnerRepositoryService {
  private getPartnerData(v: Omit<PartnerInfo, 'id'>): Omit<PartnerInfo, 'id'> {
    const { partnerType } = v;
    let { companyInfo, personalInfo, contactInfo, addressInfo } = v;

    if (
      !partnerType ||
      (partnerType === PartnerType.naturalPerson && !!companyInfo) ||
      (partnerType === PartnerType.legalEntity && !!personalInfo)
    ) {
      throw new PersistenceError(ErrorMessageCode.INVALID_PARTNER_TYPE);
    }

    companyInfo =
      partnerType === PartnerType.legalEntity ? { ...companyInfo } : undefined;
    personalInfo =
      partnerType === PartnerType.naturalPerson
        ? { ...personalInfo }
        : undefined;

    contactInfo = { ...contactInfo };
    addressInfo = { ...addressInfo };
    return { partnerType, companyInfo, personalInfo, contactInfo, addressInfo };
  }

  async add(v: Omit<PartnerInfo, 'id'>): Promise<{ id: string }> {
    const { partnerType, companyInfo, personalInfo, contactInfo, addressInfo } =
      this.getPartnerData(v);

    const id = nanoid();
    const partner: PartnerInfo = {
      id,
      partnerType,
      companyInfo,
      personalInfo,
      contactInfo,
      addressInfo,
    };

    PARTNER_STORE.push(partner);

    return { id };
  }

  async find(predicate: PartnerPredicate): Promise<PartnerInfo> {
    const p = createPredicate(predicate);
    const result = PARTNER_STORE.find(p);
    return result;
  }

  async findAll(params: {
    pageNum: number;
    pageSize: number;
    predicate?: PartnerPredicate;
    sort?: string;
  }): Promise<PageData<PartnerInfo>> {
    let items: PartnerInfo[] = [];
    if (params.predicate) {
      const p = createPredicate(params.predicate);
      items = PARTNER_STORE.filter(p);
    } else {
      items = [...PARTNER_STORE];
    }

    return getPage(items, params.pageNum, params.pageSize);
  }

  async remove(v: Pick<PartnerInfo, 'id'>): Promise<unknown> {
    const { id } = v;
    const index = PARTNER_STORE.findIndex((x) => x.id === id);
    if (index < 0) {
      throw new PersistenceError(ErrorMessageCode.PARTNER_NOT_FOUND, id);
    }
    PARTNER_STORE.slice(index, 1);
    return true;
  }

  async update(v: PartnerInfo): Promise<unknown> {
    const { id } = v;
    const { partnerType, companyInfo, personalInfo, contactInfo, addressInfo } =
      this.getPartnerData(v);
    const u = PARTNER_STORE.findIndex((u) => u.id === id);

    if (!u) {
      throw new PersistenceError(ErrorMessageCode.PARTNER_NOT_FOUND, id);
    }

    Object.assign(u, {
      partnerType,
      companyInfo,
      personalInfo,
      contactInfo,
      addressInfo,
    });
    return true;
  }
}
