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
