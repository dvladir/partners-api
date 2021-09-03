create or replace function get_partner(_partner_id uuid)
returns table (like v_partners_full) as $$
    begin
        return query select * from v_partners_full where id = _partner_id;
    end;
$$ language plpgsql;