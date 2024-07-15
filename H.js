CREATE TABLE education (
    education_id SERIAL PRIMARY KEY,
    university   VARCHAR(255),
    major        VARCHAR(255),
    gpa          FLOAT,
    coursework   VARCHAR(1000),
    location     VARCHAR(255),
    user_id      INTEGER NOT NULL
);

CREATE TABLE project (
    project_id  SERIAL PRIMARY KEY,
    title       VARCHAR(255),
    description VARCHAR(255),
    user_id     INTEGER NOT NULL
);

CREATE TABLE user_data (
    user_id    SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name  VARCHAR(255),
    phone      NUMERIC,
    email      VARCHAR(255),
    location   VARCHAR(255),
    languages  VARCHAR(255)
);

CREATE TABLE work_experience (
    work_experience_id SERIAL PRIMARY KEY,
    title              VARCHAR(255),
    company            VARCHAR(255),
    description        VARCHAR(1000),
    start_date         DATE,
    end_date           DATE,
    user_id            INTEGER NOT NULL
);

ALTER TABLE education
    ADD CONSTRAINT education_user_data_fk FOREIGN KEY (user_id)
        REFERENCES user_data (user_id);

ALTER TABLE project
    ADD CONSTRAINT project_user_data_fk FOREIGN KEY (user_id)
        REFERENCES user_data (user_id);

ALTER TABLE work_experience
    ADD CONSTRAINT work_experience_user_data_fk FOREIGN KEY (user_id)
        REFERENCES user_data (user_id);
