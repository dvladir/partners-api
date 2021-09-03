create table address (
    id           serial primary key,
    city         varchar(256),
    street       varchar(256),
    house_number varchar(15),
    inx          varchar(10)
)
