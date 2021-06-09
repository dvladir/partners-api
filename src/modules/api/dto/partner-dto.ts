import { AddressDto, fromAddressDto, toAddressDto } from './address-dto';
import { ContactDto, fromContactDto, toContactDto } from './contact-dto';
import { PartnerType } from '@domain/partner-type.enum';
import { fromPersonalDto, PersonalDto, toPersonalDto } from './personal-dto';
import { CompanyDto, fromCompanyDto, toCompanyDto } from './company-dto';
import { PartnerInfo } from '@domain/partner-info';

export interface CommonPartnerDto {
  id: string;
  addressInfo: AddressDto;
  contactInfo: ContactDto;
}

export interface NaturalPersonPartnerDto extends CommonPartnerDto {
  partnerType: PartnerType.naturalPerson;
  personalInfo: PersonalDto;
}

export interface LegalEntityPartnerDto extends CommonPartnerDto {
  partnerType: PartnerType.legalEntity;
  companyInfo: CompanyDto;
}

export type PartnerDto = NaturalPersonPartnerDto | LegalEntityPartnerDto;

export type PartnerUpdateDataDto = Omit<PartnerDto, 'id'>;

export const toPartnerDto = (p: PartnerInfo): PartnerDto => {

  const {
    id,
    addressInfo,
    contactInfo,
    companyInfo,
    personalInfo,
    partnerType,
  } = p;

  let result: PartnerDto = null;

  switch (partnerType) {
    case PartnerType.naturalPerson:
      result = {
        id,
        partnerType,
        addressInfo: toAddressDto(addressInfo),
        contactInfo: toContactDto(contactInfo),
        personalInfo: toPersonalDto(personalInfo),
      };
      break;
    case PartnerType.legalEntity:
      result = {
        id,
        partnerType,
        addressInfo: toAddressDto(addressInfo),
        contactInfo: toContactDto(contactInfo),
        companyInfo: toCompanyDto(companyInfo),
      };
      break;
    default:
      break;
  }

  return result;
};

export const fromPartnerDto = (p: PartnerDto): PartnerInfo => {
  const { id, partnerType, addressInfo, contactInfo } = p;

  const result: PartnerInfo = {
    id,
    partnerType,
    addressInfo: fromAddressDto(addressInfo),
    contactInfo: fromContactDto(contactInfo)
  };

  switch (p.partnerType) {
    case PartnerType.legalEntity:
      const { companyInfo } = p;
      result.companyInfo = fromCompanyDto(companyInfo);
      break;
    case PartnerType.naturalPerson:
      const { personalInfo } = p;
      result.personalInfo = fromPersonalDto(personalInfo);
      break;
    default:
      break;
  }

  return result;
};
