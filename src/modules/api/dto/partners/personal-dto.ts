import { Gender } from '@domain/gender.enum';
import { PersonalInfo } from '@domain/personal-info';
import { ApiProperty } from '@nestjs/swagger';
import { format, parse } from 'date-fns';

export class PersonalDto {
  constructor(data: Partial<PersonalDto> = {}) {
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.middleName = data.middleName || '';
    this.birthDate = data.birthDate || '';
    this.gender = data.gender || undefined;
  }

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  middleName: string;

  @ApiProperty()
  birthDate: string;

  @ApiProperty({
    enum: [Gender.male, Gender.female],
  })
  gender: Gender;

  static toDto(p: PersonalInfo): PersonalDto {
    const birthDate = !!p.birthDate ? format(p.birthDate, 'dd/MM/yyyy') : '';
    return new PersonalDto({ ...p, birthDate });
  }

  static fromDto(p: PersonalDto): PersonalInfo {
    if (!p) return undefined;
    const { firstName, lastName, middleName, gender } = p;
    const birthDate = !!p.birthDate ? parse(p.birthDate, 'dd/MM/yyyy', 0) : undefined;
    return { firstName, lastName, middleName, birthDate, gender };
  }
}
