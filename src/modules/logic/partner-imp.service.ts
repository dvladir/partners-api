import { PartnerService } from './partner.service';
import { Injectable } from '@nestjs/common';
import { PartnerInfo } from '@domain/partner-info';
import {
  PartnerPredicateById,
  PartnerPredicateBySearchString,
  PartnerRepositoryService,
} from '../data';
import { ErrorHandler } from '@common/error-handler';
import { PageData } from '@domain/page-data';
import { ServiceError } from './common/service-error';
import { ErrorMessageCode } from '@common/error-message-code.enum';
import { ErrorInfo } from '@domain/error-info';
import { ValidationErrorCode } from './common/validation-error-code.enum';
import { ValidationErrorCollector } from './common/validation-error-collector';
import { PartnerType } from '@domain/partner-type.enum';

@Injectable()
export class PartnerImpService implements PartnerService {
  constructor(
    private _partnerRepo: PartnerRepositoryService,
    private _errorHandler: ErrorHandler,
  ) {}

  private validatePartner(
    partner: Partial<PartnerInfo>,
  ): ErrorInfo<PartnerInfo> {
    const errorBuilder = new ValidationErrorCollector<PartnerInfo>();

    const isStringEmpty = (value?: string) => !(value || '').trim();

    if (!partner?.partnerType) {
      errorBuilder
        .child('partnerType')
        .addErrors(ValidationErrorCode.FIELD_REQUIRED);
    } else if (!Object.values(PartnerType).includes(partner.partnerType)) {
      errorBuilder
        .child('partnerType')
        .addErrors(ValidationErrorCode.INVALID_VALUE);
    }



    if (isStringEmpty(partner?.addressInfo?.idx)) {
      errorBuilder
        .child('addressInfo')
        .child('idx')
        .addErrors(ValidationErrorCode.FIELD_REQUIRED);
    }

    if (isStringEmpty(partner?.addressInfo?.houseNumber)) {
      errorBuilder
        .child('addressInfo')
        .child('houseNumber')
        .addErrors(ValidationErrorCode.FIELD_REQUIRED);
    }

    if (isStringEmpty(partner?.addressInfo?.street)) {
      errorBuilder
        .child('addressInfo')
        .child('street')
        .addErrors(ValidationErrorCode.FIELD_REQUIRED);
    }

    if (isStringEmpty(partner?.contactInfo?.phone)) {
      errorBuilder
        .child('contactInfo')
        .child('phone')
        .addErrors(ValidationErrorCode.FIELD_REQUIRED);
    }

    if (isStringEmpty(partner?.contactInfo?.email)) {
      errorBuilder
        .child('contactInfo')
        .child('email')
        .addErrors(ValidationErrorCode.FIELD_REQUIRED);
    }

    if (partner?.partnerType === PartnerType.naturalPerson) {
      if (isStringEmpty(partner?.personalInfo?.firstName)) {
        errorBuilder
          .child('personalInfo')
          .child('firstName')
          .addErrors(ValidationErrorCode.FIELD_REQUIRED);
      }

      if (isStringEmpty(partner?.personalInfo?.lastName)) {
        errorBuilder
          .child('personalInfo')
          .child('lastName')
          .addErrors(ValidationErrorCode.FIELD_REQUIRED);
      }
    }

    if (partner?.partnerType === PartnerType.legalEntity) {
      if (isStringEmpty(partner?.companyInfo?.name)) {
        errorBuilder
          .child('companyInfo')
          .child('name')
          .addErrors(ValidationErrorCode.FIELD_REQUIRED);
      }
    }

    const result = errorBuilder.collect();

    return result;
  }

  addPartner(v: Omit<PartnerInfo, 'id'>): Promise<{ id: string }> {
    try {
      const errors = this.validatePartner(v);
      if (errors) {
        throw new ServiceError(ErrorMessageCode.VALIDATION_ERROR, errors);
      }
      return this._partnerRepo.add(v);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  async getPartnerById(id: string): Promise<PartnerInfo> {
    try {
      const partner = await this._partnerRepo.find(
        new PartnerPredicateById(id),
      );
      if (!partner) {
        throw new ServiceError(ErrorMessageCode.PARTNER_NOT_FOUND, id);
      }
      return partner;
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  removePartner(id: string): Promise<unknown> {
    try {
      return this._partnerRepo.remove({ id });
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  searchPartners(
    search: string,
    pageNum: number,
    pageSize: number,
  ): Promise<PageData<PartnerInfo>> {
    try {
      const predicate = new PartnerPredicateBySearchString(search);
      return this._partnerRepo.findAll({
        predicate,
        pageNum,
        pageSize,
      });
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  updatePartner(v: PartnerInfo): Promise<unknown> {
    try {
      const errors = this.validatePartner(v);
      if (errors) {
        throw new ServiceError(ErrorMessageCode.VALIDATION_ERROR, errors);
      }
      return this._partnerRepo.update(v);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }
}
