import { Address } from './address';
import { ContactInfo } from './contact-info';
import { PartnerType } from './partner-type.enum';
import { PersonalInfo } from './personal-info';
import { CompanyInfo } from './company-info';

export interface PartnerInfo {
  id: string;
  addressInfo: Address;
  contactInfo: ContactInfo;
  partnerType: PartnerType;
  personalInfo?: PersonalInfo;
  companyInfo?: CompanyInfo;
}
