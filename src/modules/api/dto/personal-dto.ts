import { Gender } from '@domain/gender.enum';
import { PersonalInfo } from '@domain/personal-info';

export interface PersonalDto {
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  gender: Gender;
}

export const toPersonalDto = (p: PersonalInfo): PersonalDto => {
  const { firstName, lastName, middleName, birthDate, gender } = p;
  return { firstName, lastName, middleName, birthDate, gender };
};

export const fromPersonalDto = (p: PersonalDto): PersonalInfo => {
  if (!p) return undefined;
  const { firstName, lastName, middleName, birthDate, gender } = p;
  return { firstName, lastName, middleName, birthDate, gender };
};
