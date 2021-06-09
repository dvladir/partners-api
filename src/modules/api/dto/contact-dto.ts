import { ContactInfo } from '@domain/contact-info';

export interface ContactDto {
  phone: string;
  email: string;
}

export const toContactDto = (c: ContactInfo): ContactDto => {
  const { phone, email } = c;
  return { phone, email };
};

export const fromContactDto = (c: ContactDto): ContactInfo => {
  if (!c) return undefined;
  const { phone, email } = c;
  return { phone, email };
};
