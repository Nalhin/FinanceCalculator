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

CREATE TABLE investments
(
    id                      int8            NOT NULL,
    owner_id                int8            NOT NULL,
    basket_id               int8            NOT NULL,
    created                 timestamp       NULL,
    category                varchar(255)    NOT NULL,
    risk                    varchar(255)    NOT NULL,
    payment                 int4            NOT NULL,
    annual_interest_rate    int4            NOT NULL,
    payment_frequency       int4            NOT NULL,
    years_of_growth         int4            NOT NULL,
    start_amount            int8            NOT NULL,
    CONSTRAINT investments_pk PRIMARY KEY (id),
    CONSTRAINT investments_basket_fk FOREIGN KEY (basket_id) REFERENCES baskets(id),
    CONSTRAINT investments_users_fk FOREIGN KEY (owner_id) REFERENCES users(id)
)
