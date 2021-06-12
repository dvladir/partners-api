import { CompanyInfo } from '@domain/company-info';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyDto {
  constructor(data: Partial<CompanyDto> = {}) {
    this.name = data.name || '';
    this.foundationYear = data.foundationYear || 0;
    this.numEmployees = data.numEmployees || 0;
  }

  @ApiProperty()
  name: string;

  @ApiProperty()
  foundationYear: number;

  @ApiProperty()
  numEmployees: number;

  static toDto(c: CompanyInfo): CompanyDto {
    return new CompanyDto(c);
  }

  static fromDto(c: CompanyDto): CompanyInfo {
    if (!c) return undefined;
    const { name, foundationYear, numEmployees } = c;
    return { name, foundationYear, numEmployees };
  }
}
