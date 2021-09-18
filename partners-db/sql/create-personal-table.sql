create type gender as enum ('male', 'female');
create table personal_info
(
    partner_id  uuid primary key,
    first_name  varchar(100) default '',
    last_name   varchar(100) default '',
    middle_name varchar(100) default '',
    birth_date  date         default to_date('19700101', 'YYYYMMDD'),
    gender      gender       default null,
    constraint fk_personal_info_partner
        foreign key (partner_id)
            references partner_info (id)
            on delete cascade
);