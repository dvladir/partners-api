create or replace view v_partners as
select p.id,
       p.partner_type,
       a.city as address_city,
       a.street as address_street,
       a.house_number as address_house_number,
       a.inx as address_inx,
       c.phone as contact_phone,
       c.email as contact_email,
       pi.first_name as personal_first_name,
       pi.last_name as personal_last_name,
       pi.middle_name as personal_middle_name,
       pi.birth_date as personal_birth_date,
       pi.gender as personal_gender,
       ci.name as company_name,
       ci.foundation_year as company_foundation_year,
       ci.num_employees as company_num_employees
from partner_info p
         inner join address a on a.partner_id = p.id
         inner join contact c on c.partner_id = p.id
         left join personal_info pi on p.id = pi.partner_id
         left join company_info ci on p.id = ci.partner_id;