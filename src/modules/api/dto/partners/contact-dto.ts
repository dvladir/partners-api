import { ContactInfo } from '@domain/contact-info';
import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  constructor(data: Partial<ContactDto> = {}) {
    this.phone = data.phone;
    this.email = data.email;
  }

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  static toDto(c: ContactInfo): ContactDto {
    return new ContactDto(c);
  }

  static fromDto(c: ContactDto): ContactInfo {
    if (!c) return undefined;
    const { phone, email } = c;
    return { phone, email };
  }
}
