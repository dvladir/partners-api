import { PartnerType } from '@domain/partner-type.enum';
import { PartnerInfo } from '@domain/partner-info';

export interface PartnerHeaderDto {
  id: string;
  displayName: string;
  partnerType: PartnerType;
  city: string;
  address: string;
  email: string;
}

export const toPartnerHeaderDto = (p: PartnerInfo): PartnerHeaderDto => {
  const { id, partnerType } = p;
  const displayName =
    partnerType === PartnerType.legalEntity
      ? p.companyInfo?.name || ''
      : [
          p.personalInfo.lastName,
          p.personalInfo.firstName,
          p.personalInfo.middleName,
        ]
          .filter((x) => !!x)
          .join(' ');

  const { city } = p.addressInfo;
  const address = [
    p.addressInfo.street,
    p.addressInfo.houseNumber,
    p.addressInfo.idx,
  ]
    .filter((x) => !!x)
    .join(' ');

  const { email } = p.contactInfo;

  return { id, partnerType, displayName, city, address, email };
};
