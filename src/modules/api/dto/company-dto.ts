import { CompanyInfo } from '@domain/company-info';

export interface CompanyDto {
  name: string;
  foundationYear: number;
  numEmployees: number;
}

export const toCompanyDto = (c: CompanyInfo): CompanyDto => {
  const { name, foundationYear, numEmployees } = c;
  return { name, foundationYear, numEmployees };
};

export const fromCompanyDto = (c: CompanyDto): CompanyInfo => {
  if (!c) return undefined;
  const { name, foundationYear, numEmployees } = c;
  return { name, foundationYear, numEmployees };
};
