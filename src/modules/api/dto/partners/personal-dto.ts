import { Gender } from '@domain/gender.enum';
import { PersonalInfo } from '@domain/personal-info';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  gender: Gender;

  static toDto(p: PersonalInfo): PersonalDto {
    return new PersonalDto(p);
  }

  static fromDto(p: PersonalDto): PersonalInfo {
    if (!p) return undefined;
    const { firstName, lastName, middleName, birthDate, gender } = p;
    return { firstName, lastName, middleName, birthDate, gender };
  }
}
