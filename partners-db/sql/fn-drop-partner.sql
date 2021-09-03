create or replace function drop_partner(_partner_id uuid)
returns bool as $$
    declare
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
            pi.personal_id,
            pi.company_id,
            pi.address_id,
            pi.contact_id
        into
            _personal_id,
            _company_id,
            _address_id,
            _contact_id
        from partner_info pi where pi.id = _partner_id;

        delete from personal_info where id = _personal_id;
        delete from company_info where id = _company_id;
        delete from address where id = _address_id;
        delete from contact where id = _contact_id;

        delete from partner_info where id = _partner_id;

        select count(pi.id) into _check from partner_info pi where pi.id = _partner_id;
        if _check = 0 then
            _result := true;
        end if;

        return _result;
    end;
$$ language plpgsql