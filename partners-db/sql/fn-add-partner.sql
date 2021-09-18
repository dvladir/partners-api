create or replace function add_partner(
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