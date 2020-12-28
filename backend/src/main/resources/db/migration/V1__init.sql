CREATE SEQUENCE hibernate_sequence;

CREATE TABLE users
(
    id         bigint       NOT NULL,
    email      varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    username   varchar(255) NOT NULL,
    CONSTRAINT users_email_uk UNIQUE (email),
    CONSTRAINT users_username_uk UNIQUE (username),
    CONSTRAINT users_pk PRIMARY KEY (id)
);

CREATE TABLE baskets
(
    id           bigint       NOT NULL,
    name         varchar(255) NOT NULL,
    description  varchar(255) NOT NULL,
    owner_id     bigint       NOT NULL,
    created_date timestamp    NOT NULL,
    CONSTRAINT baskets_users_fk FOREIGN KEY (owner_id) REFERENCES users (id),
    CONSTRAINT baskets_pk PRIMARY KEY (id)
);

CREATE TABLE investments
(
    id                   bigint           NOT NULL,
    owner_id             bigint           NOT NULL,
    basket_id            bigint           NOT NULL,
    created_date         timestamp        NOT NULL,
    category             varchar(255)     NOT NULL,
    payment              integer          NOT NULL,
    annual_interest_rate double precision NOT NULL,
    payment_frequency    integer          NOT NULL,
    compound_frequency   integer          NOT NULL,
    years_of_growth      integer          NOT NULL,
    start_amount         integer          NOT NULL,
    CONSTRAINT investments_pk PRIMARY KEY (id),
    CONSTRAINT investments_basket_fk FOREIGN KEY (basket_id) REFERENCES baskets (id) ON DELETE CASCADE,
    CONSTRAINT investments_users_fk FOREIGN KEY (owner_id) REFERENCES users (id)
)
