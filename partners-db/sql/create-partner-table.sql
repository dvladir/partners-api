create type partnerType as enum ('naturalPerson', 'legalEntity');
create table partner_info (
    id uuid primary key default gen_random_uuid(),
    partner_type partnerType not null,
    personal_id integer
        constraint partner_info_personal_id__fk
        references personal_info (id)
        default null,
    company_id integer
        constraint partner_info_company_id__fk
        references company_info (id)
        default null,
    address_id integer not null
        constraint partner_info_address_id__fk
        references address (id),
    contact_id integer not null
        constraint partner_info_contact_id__fk
        references contact(id),
    constraint partner_info_partner_type__check
        check (
          ((partner_type = 'naturalPerson') and (personal_id is not null) and (company_id is null))
          or
          ((partner_type = 'legalEntity') and (personal_id is null) and (company_id is not null))
       )
);