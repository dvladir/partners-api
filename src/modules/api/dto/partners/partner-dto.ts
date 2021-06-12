import { AddressDto } from './address-dto';
import { ContactDto } from './contact-dto';
import { PartnerType } from '@domain/partner-type.enum';
import { PersonalDto } from './personal-dto';
import { CompanyDto } from './company-dto';
import { PartnerInfo } from '@domain/partner-info';
import { ApiProperty } from '@nestjs/swagger';

export class PartnerDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  addressInfo: AddressDto;

  @ApiProperty()
  contactInfo: ContactDto;

  @ApiProperty({
    enum: [PartnerType.naturalPerson, PartnerType.legalEntity]
  })
  partnerType: PartnerType;

  @ApiProperty()
  personalInfo?: PersonalDto;

  @ApiProperty()
  companyInfo?: CompanyDto;

  static toDto(p: PartnerInfo): PartnerDto {
    const result = new PartnerDto();
    result.id = p.id;
    result.addressInfo = AddressDto.toDto(p.addressInfo);
    result.contactInfo = ContactDto.toDto(p.contactInfo);
    result.partnerType = p.partnerType;
    result.personalInfo =
      p.partnerType === PartnerType.naturalPerson
        ? PersonalDto.toDto(p.personalInfo)
        : undefined;
    result.companyInfo =
      p.partnerType === PartnerType.legalEntity
        ? CompanyDto.toDto(p.companyInfo)
        : undefined;
    return result;
  }

  static fromDto(p: PartnerDto): PartnerInfo {
    const id = p.id;
    const partnerType = p.partnerType;
    const addressInfo = AddressDto.fromDto(p.addressInfo);
    const contactInfo = ContactDto.fromDto(p.contactInfo);
    const personalInfo =
      p.partnerType === PartnerType.naturalPerson
        ? PersonalDto.fromDto(p.personalInfo)
        : undefined;
    const companyInfo =
      p.partnerType === PartnerType.legalEntity
        ? CompanyDto.fromDto(p.companyInfo)
        : undefined;
    return {
      id,
      partnerType,
      addressInfo,
      contactInfo,
      personalInfo,
      companyInfo,
    };
  }
}
