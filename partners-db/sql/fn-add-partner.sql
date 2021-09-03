create or replace function add_partner(
    _partner_type partnertype,
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
        _personal_id integer default null;
        _company_id integer default null;
        _address_id integer;
        _contact_id integer;
        _result uuid;
    begin
        insert into contact (phone, email)
        values (_contact_phone, _contact_email)
        returning id into _contact_id;

        insert into address (city, street, house_number, inx)
        values (_address_city, _address_street, _address_house_number, _address_inx)
        returning id into _address_id;

        if (_partner_type = 'naturalPerson') then
            insert into personal_info (first_name, last_name, middle_name, birth_date, gender)
            values (_person_first_name, _person_last_name, _person_middle_name, _person_date, _person_gender)
            returning id into _personal_id;
        else
            insert into company_info (name, foundation_year, num_employees)
            values (_company_name, _company_foundation_year, _company_num_empl)
            returning id into _company_id;
        end if;

        insert into partner_info (partner_type, personal_id, company_id, address_id, contact_id)
        values (_partner_type, _personal_id, _company_id, _address_id, _contact_id)
        returning id into _result;

        return _result;
    end;
$$ language plpgsql