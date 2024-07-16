CREATE SEQUENCE user_data_user_id_seq;

CREATE TABLE user_data (
    user_id    INTEGER DEFAULT nextval('user_data_user_id_seq') PRIMARY KEY,
    first_name VARCHAR(255),
    last_name  VARCHAR(255),
    phone      NUMERIC,
    email      VARCHAR(255),
    location   VARCHAR(255),
    languages  VARCHAR(255)
);

ALTER SEQUENCE user_data_user_id_seq OWNED BY user_data.user_id;
