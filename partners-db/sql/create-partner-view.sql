create view v_partners as
    select p.id,
           p.partner_type,
           a.city,
           concat_ws(' ', a.street, a.house_number, a.inx) as address,
           c.email,
           case when p.partner_type = 'naturalPerson'
            then concat_ws(' ', pi.last_name, pi.first_name, pi.middle_name)
            else ci.name
           end as name
    from partner_info p
    inner join address a on a.id = p.address_id
    inner join contact c on c.id = p.contact_id
    left join personal_info pi on p.personal_id = pi.id
    left join company_info ci on p.company_id = ci.id






