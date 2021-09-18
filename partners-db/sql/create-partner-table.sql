create type partner_type as enum ('naturalPerson', 'legalEntity');
create table partner_info (
    id uuid primary key default gen_random_uuid(),
    partner_type partner_type not null
);