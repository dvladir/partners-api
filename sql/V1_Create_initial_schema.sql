create type partner_type as enum ('naturalPerson', 'legalEntity');
create table partner_info
(
    id           uuid primary key default gen_random_uuid(),
    partner_type partner_type not null
);

create table address
(
    partner_id   uuid primary key,
    city         varchar(256) default '',
    street       varchar(256) default '',
    house_number varchar(15)  default '',
    inx          varchar(10)  default '',
    constraint fk_address_partner
        foreign key (partner_id)
            references partner_info (id)
            on delete cascade
);

create table contact
(
    partner_id uuid primary key,
    phone      varchar(20)  default '',
    email      varchar(100) default '',
    constraint fk_contact_partner
        foreign key (partner_id)
            references partner_info (id)
            on delete cascade
);

create type gender as enum ('male', 'female');
create table personal_info
(
    partner_id  uuid primary key,
    first_name  varchar(100) default '',
    last_name   varchar(100) default '',
    middle_name varchar(100) default '',
    birth_date  date         default to_date('19700101', 'YYYYMMDD'),
    gender      gender       default null,
    constraint fk_personal_info_partner
        foreign key (partner_id)
            references partner_info (id)
            on delete cascade
);

create table company_info
(
    partner_id      uuid primary key,
    name            varchar(200) default '',
    foundation_year int4         default 1900,
    num_employees   int4         default 0,
    constraint fk_company_info_partner
        foreign key (partner_id)
            references partner_info (id)
            on delete cascade
);

create function add_partner(
    _partner_type partner_type,
    _address_city varchar(256) default '',
    _address_street varchar(256) default '',
    _address_house_number varchar(15) default '',
    _address_inx varchar(10) default '',
    _contact_phone varchar(20) default '',
    _contact_email varchar(100) default '',
    _person_gender gender default null,
    _person_first_name varchar(100) default '',
    _person_last_name varchar(100) default '',
    _person_middle_name varchar(100) default '',
    _person_date date default null,
    _company_name varchar(200) default '',
    _company_foundation_year int4 default 0,
    _company_num_empl int4 default 0
)
    returns uuid as $$
declare
    _result uuid;
begin
    insert into partner_info (partner_type)
    values (_partner_type)
    returning id into _result;

    insert into contact (partner_id, phone, email)
    values (_result, _contact_phone, _contact_email);

    insert into address (partner_id, city, street, house_number, inx)
    values (_result, _address_city, _address_street, _address_house_number, _address_inx);

    if (_partner_type = 'naturalPerson') then
        insert into personal_info (partner_id, first_name, last_name, middle_name, birth_date, gender)
        values (_result, _person_first_name, _person_last_name, _person_middle_name, _person_date, _person_gender);
    else
        insert into company_info (partner_id, name, foundation_year, num_employees)
        values (_result, _company_name, _company_foundation_year, _company_num_empl);
    end if;

    return _result;
end;
$$ language plpgsql
