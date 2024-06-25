ion ADD CONSTRAINT education_pk PRIMARY KEY ( education_id );

ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBD3OqQo2yd+qZwF4OV2Pb8/aykRzF+jWzeOtU6b3nZL your_email@example.com




CREATE TABLE project (
    project_id   INTEGER NOT NULL,
    project1     VARCHAR2(255), 
    description1 VARCHAR2(1000), 
    project2     VARCHAR2(255), 
    description2 VARCHAR2(1000), 
    project3     VARCHAR2(255), 
    description3 VARCHAR2(1000)
);

ALTER TABLE project ADD CONSTRAINT project_pk PRIMARY KEY ( project_id );

CREATE TABLE user_data (
    user_id    INTEGER NOT NULL,
    first_name VARCHAR2(255), 
    last_name  VARCHAR2(255), 
    phone      NUMBER,
    email      VARCHAR2(255), 
    location   VARCHAR2(255), 
    languages  VARCHAR2(255)
);

ALTER TABLE user_data ADD CONSTRAINT user_data_pk PRIMARY KEY ( user_id );

CREATE TABLE work_experience (
    work_experience_id INTEGER NOT NULL,
    title1             VARCHAR2(255), 
    company1           VARCHAR2(255), 
    description1       VARCHAR2(1000), 
    start_date1        DATE,
    end_date1          DATE,
    title2             VARCHAR2(255), 
    company2           VARCHAR2(255), 
    description2       VARCHAR2(1000), 
    start_date2        DATE,
    end_date2          DATE,
    title3             VARCHAR2(255), 
    company3           VARCHAR2(255), 
    description3       VARCHAR2(1000), 
    start_date3        DATE,
    end_date3          DATE
);

ALTER TABLE work_experience ADD CONSTRAINT work_experience_pk PRIMARY KEY ( work_experience_id );

ALTER TABLE education
    ADD CONSTRAINT education_user_data_fk FOREIGN KEY ( education_id )
        REFERENCES user_data ( user_id );

ALTER TABLE project
    ADD CONSTRAINT project_user_data_fk FOREIGN KEY ( project_id )
        REFERENCES user_data ( user_id );

ALTER TABLE work_experience
    ADD CONSTRAINT work_experience_user_data_fk FOREIGN KEY ( work_experience_id )
        REFERENCES user_data ( user_id );
