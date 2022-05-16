create table "user"
(
    id            uuid    not null
        constraint user_pk
            primary key,
    first_name    varchar not null,
    last_name     varchar not null,
    date_of_birth date    not null,
    timezone      varchar not null,
    address       varchar,
    created_at    timestamp,
    updated_at    timestamp,
    deleted_at    timestamp
);

alter table "user"
    owner to postgres;