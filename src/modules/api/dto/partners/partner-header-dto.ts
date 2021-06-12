import { PartnerType } from '@domain/partner-type.enum';
import { PartnerInfo } from '@domain/partner-info';
import {ApiProperty} from '@nestjs/swagger';

export class PartnerHeaderDto {
  constructor(data: Partial<PartnerHeaderDto> = {}) {
    this.id = data.id || undefined;
    this.displayName = data.displayName || '';
    this.partnerType = data.partnerType || undefined;
    this.city = data.city || '';
    this.address = data.address || '';
    this.email = data.email || '';
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  partnerType: PartnerType;

  @ApiProperty()
  city: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  email: string;

  static toDto(p: PartnerInfo): PartnerHeaderDto {
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

    return new PartnerHeaderDto({
      id,
      partnerType,
      displayName,
      city,
      address,
      email,
    });
  }
}
