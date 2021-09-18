create table contact (
    partner_id  uuid primary key,
    phone varchar(20) default '',
    email varchar(100) default '',
    constraint fk_contact_partner
        foreign key (partner_id)
            references partner_info(id)
            on delete cascade
);