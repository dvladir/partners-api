import { Gender } from './gender.enum';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate?: Date;
  gender: Gender;
}
