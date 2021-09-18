select * from add_partner(
    _partner_type := 'legalEntity',
    _address_city := 'Санкт-Петербург',
    _address_street := 'Улица 50',
    _address_house_number := '77',
    _address_inx := '321444',
    _contact_phone := '+71234503454',
    _contact_email := 'company1@test.com',
    _company_name := 'РОГА И КОПЫТА',
    _company_num_empl := 10,
    _company_foundation_year := 2011
    );

select * from add_partner(
   _partner_type := 'naturalPerson',
       _address_city := 'Санкт-Петербург',
   _address_street := 'Улица 2',
   _address_house_number := '16',
   _address_inx := '111222',
   _contact_phone := '+75112223345',
   _contact_email := 'test2@test.com',
   _person_gender := 'female',
    _person_date := to_date('03/07/1984', 'DD/MM/YYY'),
    _person_first_name := 'Анна',
   _person_last_name := 'Иванова',
   _person_middle_name := 'Ивановна'
    );

select * from add_partner(
        _partner_type := 'naturalPerson',
        _address_city := 'Санкт-Петербург',
        _address_street := 'Улица 3',
        _address_house_number := '17',
        _address_inx := '131332',
        _contact_phone := '+75112223345',
        _contact_email := 'test2@test.com',
        _person_gender := 'male',
        _person_date := to_date('01/03/1977', 'DD/MM/YYY'),
        _person_first_name := 'Пётр',
        _person_last_name := 'Шишков',
        _person_middle_name := 'Васильевич'
    );
