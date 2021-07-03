import { PartnerInfo } from '@domain/partner-info';
import { nanoid } from 'nanoid';
import { PartnerType } from '@domain/partner-type.enum';
import { Gender } from '@domain/gender.enum';

export const PARTNER_STORE: PartnerInfo[] = [
  {
    id: nanoid(),
    addressInfo: {
      city: 'Москва',
      street: 'Улица 1',
      houseNumber: '1a',
      idx: '123123',
    },
    contactInfo: { phone: '+71112223344', email: 'test1@test.com' },
    partnerType: PartnerType.naturalPerson,
    personalInfo: {
      firstName: 'Петр',
      lastName: 'Петров',
      middleName: 'Петрович',
      birthDate: '10/10/1978',
      gender: Gender.male,
    },
  },
  {
    id: nanoid(),
    addressInfo: {
      city: 'Санкт-Петербург',
      street: 'ул. Коломенская',
      houseNumber: '38',
      idx: '123321',
    },
    contactInfo: { phone: '+7589803414', email: 'compay3@test.com' },
    partnerType: PartnerType.legalEntity,
    companyInfo: { name: 'Астарта', numEmployees: 7, foundationYear: 2019 },
  },
  {
    id: nanoid(),
    addressInfo: {
      city: 'Санкт-Петербург',
      street: 'Улица 2',
      houseNumber: '1б',
      idx: '111222',
    },
    contactInfo: { phone: '+75112223345', email: 'test2@test.com' },
    partnerType: PartnerType.naturalPerson,
    personalInfo: {
      firstName: 'Анна',
      lastName: 'Иванова',
      middleName: 'Ивановна',
      birthDate: '03/07/1984',
      gender: Gender.female,
    },
  },
  {
    id: nanoid(),
    addressInfo: {
      city: 'Москва',
      street: 'Улица 3',
      houseNumber: '3a',
      idx: '432123',
    },
    contactInfo: { phone: '+76112223346', email: 't3est@test.com' },
    partnerType: PartnerType.naturalPerson,
    personalInfo: {
      firstName: 'Федор',
      lastName: 'Федоров',
      middleName: 'Федорович',
      birthDate: '08/02/1981',
      gender: Gender.male,
    },
  },
  {
    id: nanoid(),
    addressInfo: {
      city: 'Санкт-Петербург',
      street: 'Невский пр.',
      houseNumber: '88',
      idx: '123444',
    },
    contactInfo: { phone: '+79589803454', email: 'test112@test.com' },
    partnerType: PartnerType.legalEntity,
    companyInfo: { name: 'ООО "ВИТА"', numEmployees: 50, foundationYear: 2001 },
  },
  {
    id: nanoid(),
    addressInfo: {
      city: 'Екатеринбург',
      street: 'ул. Ленина',
      houseNumber: '37',
      idx: '625123',
    },
    contactInfo: { phone: '+78812222244', email: 'te4st@test.com' },
    partnerType: PartnerType.naturalPerson,
    personalInfo: {
      firstName: 'Семен',
      lastName: 'Горбунков',
      middleName: 'Семенович',
      birthDate: '10/10/1945',
      gender: Gender.male,
    },
  },
  {
    id: nanoid(),
    addressInfo: {
      city: 'Москва',
      street: 'пр. Номер 8',
      houseNumber: '1a',
      idx: '123123',
    },
    contactInfo: { phone: '+71555223344', email: 'te33st@test.com' },
    partnerType: PartnerType.naturalPerson,
    personalInfo: {
      firstName: 'Виктор',
      lastName: 'Страшнов',
      middleName: 'Павлович',
      birthDate: '10/10/1968',
      gender: Gender.male,
    },
  },
  {
    id: nanoid(),
    addressInfo: {
      city: 'Санкт-Петербург',
      street: 'Улица 50',
      houseNumber: '77',
      idx: '321444',
    },
    contactInfo: { phone: '+71234503454', email: 'compay1@test.com' },
    partnerType: PartnerType.legalEntity,
    companyInfo: {
      name: 'РОГА и КОПЫТА',
      numEmployees: 10,
      foundationYear: 2011,
    },
  },
  {
    id: nanoid(),
    addressInfo: {
      city: 'Екатеринбург',
      street: 'ул. Вайнера',
      houseNumber: '4',
      idx: '626444',
    },
    contactInfo: { phone: '+79334803454', email: 'compay2@test.com' },
    partnerType: PartnerType.legalEntity,
    companyInfo: {
      name: 'ООО "Нью-Тех"',
      numEmployees: 55,
      foundationYear: 1998,
    },
  },
  {
    id: nanoid(),
    addressInfo: {
      city: 'Москва',
      street: 'Улица 1',
      houseNumber: '88',
      idx: '120897',
    },
    contactInfo: { phone: '+77587703454', email: 'compay4@test.com' },
    partnerType: PartnerType.legalEntity,
    companyInfo: {
      name: 'СтройТехСервис',
      numEmployees: 63,
      foundationYear: 2005,
    },
  },
  {
    id: nanoid(),
    addressInfo: {
      city: 'Санкт-Петербург',
      street: 'Улица 8',
      houseNumber: '99',
      idx: '199233',
    },
    contactInfo: { phone: '+78092324341', email: 't0s51@test.com' },
    partnerType: PartnerType.naturalPerson,
    personalInfo: {
      firstName: 'Василий',
      lastName: 'Васильев',
      middleName: 'Васильевич',
      birthDate: '11/12/1963',
      gender: Gender.male,
    },
  },
  {
    id: nanoid(),
    addressInfo: {
      city: 'Санкт-Петербург',
      street: 'ул. Думская',
      houseNumber: '1',
      idx: '234567',
    },
    contactInfo: { phone: '+71519123414', email: 'company5@test.com' },
    partnerType: PartnerType.legalEntity,
    companyInfo: {
      name: 'Ordo Malleus',
      numEmployees: 22,
      foundationYear: 2001,
    },
  },
];
