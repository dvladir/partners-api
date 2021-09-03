create or replace function add_partner(
    _partner_id uuid,
    _address_city varchar(256) default null,
    _address_street varchar(256) default null,
    _address_house_number varchar(15) default null,
    _address_inx varchar(10) default null,
    _contact_phone varchar(20) default null,
    _contact_email varchar(100) default null,
    _person_gender gender default null,
    _person_first_name varchar(100) default null,
    _person_last_name varchar(100) default null,
    _person_middle_name varchar(100) default null,
    _person_date date default null,
    _company_name varchar(200) default null,
    _company_foundation_year int4 default null,
    _company_num_empl int4 default null
)
returns bool as $$
declare
    _partner_type partnertype;
    _personal_id int4 default null;
    _company_id int4 default null;
    _address_id int4 default null;
    _contact_id int4 default null;
    _check int4;
    _result bool default false;
begin
    select count(pi.id) into _check from partner_info pi where pi.id = _partner_id;
    if _check = 0 then
        return _result;
    end if;

    select
        pi.partner_type,
        pi.personal_id,
        pi.company_id,
        pi.address_id,
        pi.contact_id
    into
        _partner_type,
        _personal_id,
        _company_id,
        _address_id,
        _contact_id
    from partner_info pi where pi.id = _partner_id;

    update address a
    set city = coalesce(_address_city, a.city),
        street = coalesce(_address_street, a.street),
        house_number = coalesce(_address_house_number, a.house_number),
        inx = coalesce(_address_inx, a.inx)
    where a.id = _address_id;

    update contact c
    set phone = coalesce(_contact_phone, c.phone),
        email = coalesce(_contact_email, c.email)
    where c.id = _contact_id;

    if _partner_type = 'naturalPerson' then
        update personal_info pi
        set first_name = coalesce(_person_first_name, pi.first_name),
            last_name = coalesce(_person_last_name, pi.last_name),
            middle_name = coalesce(_person_middle_name, pi.middle_name),
            birth_date = coalesce(_person_date, pi.birth_date),
            gender = coalesce(_person_gender, pi.gender)
        where pi.id = _personal_id;
    else
        update company_info ci
        set name = coalesce(_company_name, ci.name),
            foundation_year = coalesce(_company_foundation_year, ci.foundation_year),
            num_employees = coalesce(_company_num_empl, ci.num_employees)
        where ci.id = _company_id;
    end if;

    _result = true;
    return true;
end;
$$ language plpgsql;
