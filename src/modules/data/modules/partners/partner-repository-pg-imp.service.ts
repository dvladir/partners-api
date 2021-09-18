import { Injectable } from '@nestjs/common';
import { PartnerRepositoryService } from './partner-repository.service';
import { PgDbService } from '../../../pg-db/pg-db.service';
import {
  PartnerPredicate,
  PartnerPredicateById,
  PartnerPredicateBySearchString,
} from './partner-predicate';
import { PageData } from '@domain/page-data';
import { PartnerInfo } from '@domain/partner-info';
import { PersistenceError } from '../common/persistence-error';
import { ErrorMessageCode } from '@common/error-message-code.enum';
import { PartnerType } from '@domain/partner-type.enum';
import { Gender } from '@domain/gender.enum';

@Injectable()
export class PartnerRepositoryPgImpService implements PartnerRepositoryService {
  constructor(private _pgDb: PgDbService) {}

  private readPartner(row: any): PartnerInfo {
    if (!row) {
      return undefined;
    }

    const result: PartnerInfo = {
      id: row.id,
      partnerType: row.partner_type as PartnerType,
      addressInfo: {
        city: row.address_city,
        street: row.address_street,
        houseNumber: row.address_house_number,
        idx: row.address_inx,
      },
      contactInfo: {
        phone: row.contact_phone,
        email: row.contact_email,
      },
    };

    if (result.partnerType === PartnerType.naturalPerson) {
      result.personalInfo = {
        firstName: row.personal_first_name,
        lastName: row.personal_last_name,
        middleName: row.personal_middle_name,
        gender: row.personal_gender as Gender,
        birthDate: row.personal_birth_date as Date,
      };
    }

    if (result.partnerType === PartnerType.legalEntity) {
      result.companyInfo = {
        name: row.company_name,
        foundationYear: row.company_foundation_year,
        numEmployees: row.company_num_employees,
      };
    }

    return result;
  }

  async add(v: Omit<PartnerInfo, 'id'>): Promise<{ id: string }> {
    const client = await this._pgDb.pool.connect();
    let id: string = undefined;

    try {
      await client.query('begin');

      const idRow = await client.query({
        name: 'addPartnerType',
        text: `insert into partner_info (partner_type) values ($1) returning id`,
        values: [v.partnerType],
      });

      id = idRow.rows[0].id;

      await client.query({
        name: 'addAddress',
        text: `insert into address (partner_id, city, street, house_number, inx)
               values ($1, $2, $3, $4, $5)`,
        values: [
          id,
          v.addressInfo.city,
          v.addressInfo.street,
          v.addressInfo.houseNumber,
          v.addressInfo.idx,
        ],
      });

      await client.query({
        name: 'addContact',
        text: `insert into contact(partner_id, phone, email)
               values ($1, $2, $3)`,
        values: [id, v.contactInfo.phone, v.contactInfo.email],
      });

      if (v.partnerType === PartnerType.naturalPerson) {
        await client.query({
          name: 'addPersonalInfo',
          text: `insert into personal_info(partner_id, first_name, last_name, middle_name, birth_date, gender) 
                 values ($1, $2, $3, $4, $5, $6)`,
          values: [
            id,
            v.personalInfo.firstName,
            v.personalInfo.lastName,
            v.personalInfo.middleName,
            v.personalInfo.birthDate,
            v.personalInfo.gender,
          ],
        });
      }

      if (v.partnerType === PartnerType.legalEntity) {
        await client.query({
          name: 'addLegalEntity',
          text: `insert into company_info(partner_id, name, foundation_year, num_employees) 
                 values ($1, $2, $3, $4)`,
          values: [
            id,
            v.companyInfo.name,
            v.companyInfo.foundationYear,
            v.companyInfo.numEmployees,
          ],
        });
      }

      await client.query('commit');
    } catch (e) {
      await client.query('rollback');
      throw new PersistenceError(ErrorMessageCode.INTERNAL_ERROR, e);
    } finally {
      client.release();
    }

    return { id };
  }

  async update(v: Partial<PartnerInfo>): Promise<unknown> {
    const client = await this._pgDb.pool.connect();
    let isExists = false;

    try {
      const countRow = await client.query({
        name: 'checkPartnerExistence',
        text: `select count(*)::int4 as total from partner_info where id = $1`,
        values: [v.id],
      });

      const total: number = countRow.rows[0].total;
      isExists = total > 0;
      if (isExists) {
        await client.query('begin');

        await client.query({
          name: 'updateAddress',
          text: `update address a
                 set city = coalesce($2, a.city),
                     street = coalesce($3, a.street),
                     house_number = coalesce($4, a.house_number),
                     inx = coalesce($5, a.inx)
                 where a.partner_id = $1`,
          values: [
            v.id,
            v.addressInfo?.city || null,
            v.addressInfo?.street || null,
            v.addressInfo?.houseNumber || null,
            v.addressInfo?.idx || null,
          ],
        });

        await client.query({
          name: 'updateContact',
          text: `update contact c
                 set email = coalesce($2, c.email),
                     phone = coalesce($3, c.phone)
                 where c.partner_id = $1`,
          values: [
            v.id,
            v.contactInfo?.email || null,
            v.contactInfo?.phone || null,
          ],
        });

        if (v.partnerType === 'naturalPerson') {
          await client.query({
            name: 'updatePersonalInfo',
            text: `update personal_info pi
                   set first_name = coalesce($2, pi.first_name),
                       last_name = coalesce($3, pi.last_name),
                       middle_name = coalesce($4, pi.middle_name),
                       birth_date = coalesce($5, pi.birth_date),
                       gender = coalesce($6, pi.gender)
                   where pi.partner_id = $1`,
            values: [
              v.id,
              v.personalInfo?.firstName || null,
              v.personalInfo?.lastName || null,
              v.personalInfo?.middleName || null,
              v.personalInfo?.birthDate || null,
              v.personalInfo?.gender || null,
            ],
          });
        }

        if (v.partnerType === 'legalEntity') {
          await client.query({
            name: 'updateCompanyInfo',
            text: `update company_info ci
                   set name = coalesce($2, ci.name),
                       foundation_year = coalesce($3, ci.foundation_year),
                       num_employees = coalesce($4, ci.num_employees)`,
            values: [
              v.id,
              v.companyInfo?.name || null,
              v.companyInfo?.foundationYear || null,
              v.companyInfo?.numEmployees || null,
            ],
          });
        }

        await client.query('commit');
      }
    } catch (e) {
      await client.query('rollback');
      throw new PersistenceError(ErrorMessageCode.INTERNAL_ERROR, e);
    } finally {
      client.release();
    }

    if (!isExists) {
      throw new PersistenceError(ErrorMessageCode.PARTNER_NOT_FOUND);
    }

    return undefined;
  }

  async find(predicate: PartnerPredicate): Promise<PartnerInfo> {
    let result: PartnerInfo = undefined;

    const id = (predicate as PartnerPredicateById).id;

    const client = await this._pgDb.pool.connect();

    try {
      const partnersRow = await client.query({
        name: 'getPartnerById',
        text: `select * from v_partners where id = $1`,
        values: [id],
      });

      result = this.readPartner(partnersRow.rows[0]);
    } catch (e) {
      throw new PersistenceError(ErrorMessageCode.INTERNAL_ERROR, e);
    } finally {
      client.release();
    }

    if (!result) {
      throw new PersistenceError(ErrorMessageCode.PARTNER_NOT_FOUND);
    }

    return result;
  }

  async remove(v: Pick<PartnerInfo, 'id'>): Promise<unknown> {
    let isDeleted = false;
    const client = await this._pgDb.pool.connect();
    try {
      await client.query('begin');
      const res = await client.query({
        name: 'deletePartner',
        text: `delete from partner_info where id = $1`,
        values: [v.id],
      });
      if (res.rowCount > 0) {
        isDeleted = true;
      }
      await client.query('commit');
    } catch (e) {
      await client.query('rollback');
      throw new PersistenceError(ErrorMessageCode.INTERNAL_ERROR, e);
    } finally {
      client.release();
    }

    if (!isDeleted) {
      throw new PersistenceError(ErrorMessageCode.PARTNER_NOT_FOUND);
    }
    return undefined;
  }

  async findAll(params: {
    pageNum: number;
    pageSize: number;
    predicate?: PartnerPredicate;
    sort?: string;
  }): Promise<PageData<PartnerInfo>> {
    const result: PageData<PartnerInfo> = {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      data: [],
      total: 0,
      pagesCount: 0,
    };

    const client = await this._pgDb.pool.connect();

    try {
      await client.query('begin');

      let searchString = (params.predicate as PartnerPredicateBySearchString)
        ?.searchString;
      searchString = !!searchString ? `%${searchString.toLowerCase()}%` : '';

      await client.query({
        name: 'preparePartners',
        text: `
          create temp table t_partners as
          select p.* from v_partners p
          where $1 = '' or 
            lower(concat(
                p.address_city,
                p.address_street,
                p.address_house_number,
                p.contact_email,
                p.personal_first_name,
                p.personal_last_name,
                p.personal_middle_name,
                p.company_name
            )) like $1;`,
        values: [searchString],
      });

      const totalRows = await client.query(
        'select count(*)::int4 as total from t_partners;',
      );
      const total = totalRows.rows[0]?.total || 0;

      const partnerRows = await client.query({
        name: 'getPartners',
        text: `select p.* from t_partners p limit $1 offset $2;`,
        values: [params.pageSize, params.pageNum * params.pageSize],
      });

      const pagesCount = Math.floor(
        total / params.pageSize + (total % params.pageSize === 0 ? 0 : 1),
      );

      const data = partnerRows.rows.map((x) => this.readPartner(x));

      await client.query('drop table t_partners;');
      await client.query('commit');

      result.total = total;
      result.data = data;
      result.pagesCount = pagesCount;
    } catch (e) {
      await client.query('rollback');
      throw new PersistenceError(ErrorMessageCode.INTERNAL_ERROR, e);
    } finally {
      client.release();
    }

    return result;
  }
}
