CREATE SEQUENCE hibernate_sequence;

CREATE TABLE users
(
    id              int8         NOT NULL,
    email           varchar(255) NOT NULL,
    "password"      varchar(255) NOT NULL,
    username        varchar(255) NOT NULL,
    CONSTRAINT users_email_uk UNIQUE (email),
    CONSTRAINT users_username_uk UNIQUE (username),
    CONSTRAINT users_pk PRIMARY KEY (id)
);

CREATE TABLE baskets
(
    id              int8         NOT NULL,
    name            varchar(255) NOT NULL,
    owner_id        int8         NOT NULL,
    created_date    timestamp    NULL,
    CONSTRAINT baskets_users_fk FOREIGN KEY (owner_id) REFERENCES users(id),
    CONSTRAINT baskets_pk PRIMARY KEY (id)
);
