create table company_info (
    partner_id  uuid primary key,
    name varchar(200) default '',
    foundation_year int4 default 1900,
    num_employees int4 default 0,
    constraint fk_company_info_partner
        foreign key (partner_id)
            references partner_info(id)
            on delete cascade
);