create table address (
    partner_id   uuid primary key,
    city         varchar(256) default '',
    street       varchar(256) default '',
    house_number varchar(15) default '',
    inx          varchar(10) default '',
    constraint fk_address_partner
                     foreign key (partner_id)
                     references partner_info(id)
                     on delete cascade
);
