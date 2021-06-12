import { Address } from '@domain/address';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  constructor(data: Partial<AddressDto> = {}) {
    this.city = data.city || '';
    this.street = data.street || '';
    this.houseNumber = data.houseNumber || '';
    this.idx = data.idx || '';
  }

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  houseNumber: string;

  @ApiProperty()
  idx: string;

  static toDto(a: Address): AddressDto {
    return new AddressDto(a);
  }

  static fromDto(a: AddressDto): Address {
    if (!a) return undefined;
    const { city, street, houseNumber, idx } = a;
    return { city, street, houseNumber, idx };
  }
}
