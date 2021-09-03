create type gender as enum ('male', 'female');
create table personal_info (
    id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    middle_name varchar(100),
    birth_date date,
    gender gender
);