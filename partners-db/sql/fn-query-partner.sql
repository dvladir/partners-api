create or replace function query_partner(
    _search text default null,
    _page int4 default 0,
    _pageSize int4 default 10
)
returns table (like v_partners)
as $$
    declare
        _offset int4;
        _search_string text default null;
    begin
        _offset := _page * _pageSize;
        if _search is not null then
           _search_string := concat('%', trim(lower(_search)), '%');
        end if;
        return query
            select p.* from v_partners p
            where _search_string is null or
                  lower(concat(p.city, p.address, p.email, p.name)) like _search_string
            limit _pageSize offset _offset;
    end;
$$ language plpgsql