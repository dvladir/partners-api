import { Address } from '@domain/address';

export interface AddressDto {
  city: string;
  street: string;
  houseNumber: string;
  idx: string;
}

export const toAddressDto = (a: Address): AddressDto => {
  const { city, street, houseNumber, idx } = a;
  return { city, street, houseNumber, idx };
};

export const fromAddressDto = (a: AddressDto): Address => {
  if (!a) return undefined;
  const { city, street, houseNumber, idx } = a;
  return { city, street, houseNumber, idx };
};
