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
    const errorCollector = new ValidationErrorCollector<PartnerInfo>();

    const isStringEmpty = (value?: string) => !(value || '').trim();

    if (!partner?.partnerType) {
      errorCollector
        .child('partnerType')
        .addErrors(ValidationErrorCode.FIELD_REQUIRED);
    } else if (!Object.values(PartnerType).includes(partner.partnerType)) {
      errorCollector
        .child('partnerType')
        .addErrors(ValidationErrorCode.INVALID_VALUE);
    }

    if (isStringEmpty(partner?.addressInfo?.idx)) {
      errorCollector
        .child('addressInfo')
        .child('idx')
        .addErrors(ValidationErrorCode.FIELD_REQUIRED);
    }

    if (isStringEmpty(partner?.addressInfo?.houseNumber)) {
      errorCollector
        .child('addressInfo')
        .child('houseNumber')
        .addErrors(ValidationErrorCode.FIELD_REQUIRED);
    }

    if (isStringEmpty(partner?.addressInfo?.street)) {
      errorCollector
        .child('addressInfo')
        .child('street')
        .addErrors(ValidationErrorCode.FIELD_REQUIRED);
    }

    if (isStringEmpty(partner?.contactInfo?.phone)) {
      errorCollector
        .child('contactInfo')
        .child('phone')
        .addErrors(ValidationErrorCode.FIELD_REQUIRED);
    }

    if (isStringEmpty(partner?.contactInfo?.email)) {
      errorCollector
        .child('contactInfo')
        .child('email')
        .addErrors(ValidationErrorCode.FIELD_REQUIRED);
    }

    if (partner?.partnerType === PartnerType.naturalPerson) {
      if (isStringEmpty(partner?.personalInfo?.firstName)) {
        errorCollector
          .child('personalInfo')
          .child('firstName')
          .addErrors(ValidationErrorCode.FIELD_REQUIRED);
      }

      if (isStringEmpty(partner?.personalInfo?.lastName)) {
        errorCollector
          .child('personalInfo')
          .child('lastName')
          .addErrors(ValidationErrorCode.FIELD_REQUIRED);
      }

      if (isStringEmpty(partner?.personalInfo?.gender)) {
        errorCollector
          .child('personalInfo')
          .child('gender')
          .addErrors(ValidationErrorCode.FIELD_REQUIRED);
      }

      if (isStringEmpty(partner?.personalInfo?.birthDate)) {
        errorCollector
          .child('personalInfo')
          .child('birthDate')
          .addErrors(ValidationErrorCode.FIELD_REQUIRED);
      }
    }

    if (partner?.partnerType === PartnerType.legalEntity) {
      if (isStringEmpty(partner?.companyInfo?.name)) {
        errorCollector
          .child('companyInfo')
          .child('name')
          .addErrors(ValidationErrorCode.FIELD_REQUIRED);
      }
    }

    const result = errorCollector.collect();

    return result;
  }

  addPartner(v: Omit<PartnerInfo, 'id'>): Promise<{ id: string }> {
    try {
      const errors = this.validatePartner(v);
      if (errors) {
        throw new ServiceError(ErrorMessageCode.VALIDATION_ERROR, { errors });
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
        throw new ServiceError(ErrorMessageCode.PARTNER_NOT_FOUND, { id });
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
        throw new ServiceError(ErrorMessageCode.VALIDATION_ERROR, { errors });
      }
      return this._partnerRepo.update(v);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }
}
