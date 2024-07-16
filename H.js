Sure, I'll provide you with the Sqitch scripts to manage the database schema as described in your DDL. Sqitch organizes its scripts into deploy, revert, and verify scripts for each change. 

### Project Initialization
First, initialize the Sqitch project if you haven't done so:

```sh
sqitch init my_project --engine pg
```

### Change 1: Create Tables
Create the `deploy`, `revert`, and `verify` scripts for the tables.

#### Deploy Script: `deploy/1-create-tables.sql`

```sql
-- Deploy script for creating tables

CREATE TABLE user_data (
    user_id    SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name  VARCHAR(255),
    phone      NUMERIC,
    email      VARCHAR(255),
    location   VARCHAR(255),
    languages  VARCHAR(255)
);

CREATE TABLE education (
    education_id SERIAL PRIMARY KEY,
    university   VARCHAR(255),
    major        VARCHAR(255),
    gpa          FLOAT,
    coursework   VARCHAR(1000),
    location     VARCHAR(255),
    user_id      INTEGER NOT NULL REFERENCES user_data(user_id)
);

CREATE TABLE project (
    project_id  SERIAL PRIMARY KEY,
    title       VARCHAR(255),
    description VARCHAR(255),
    user_id     INTEGER NOT NULL REFERENCES user_data(user_id)
);

CREATE TABLE work_experience (
    work_experience_id SERIAL PRIMARY KEY,
    title              VARCHAR(255),
    company            VARCHAR(255),
    description        VARCHAR(1000),
    start_date         DATE,
    end_date           DATE,
    user_id            INTEGER NOT NULL REFERENCES user_data(user_id)
);
```

#### Revert Script: `revert/1-create-tables.sql`

```sql
-- Revert script for dropping tables

DROP TABLE IF EXISTS work_experience;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS user_data;
```

#### Verify Script: `verify/1-create-tables.sql`

```sql
-- Verify script to check the existence of tables

SELECT 1
FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'user_data';

SELECT 1
FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'education';

SELECT 1
FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'project';

SELECT 1
FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'work_experience';
```

### Change 2: Add Constraints
Create the `deploy`, `revert`, and `verify` scripts for the constraints.

#### Deploy Script: `deploy/2-add-constraints.sql`

```sql
-- Deploy script for adding constraints

ALTER TABLE education
    ADD CONSTRAINT education_user_data_fk FOREIGN KEY (user_id)
        REFERENCES user_data (user_id);

ALTER TABLE project
    ADD CONSTRAINT project_user_data_fk FOREIGN KEY (user_id)
        REFERENCES user_data (user_id);

ALTER TABLE work_experience
    ADD CONSTRAINT work_experience_user_data_fk FOREIGN KEY (user_id)
        REFERENCES user_data (user_id);
```

#### Revert Script: `revert/2-add-constraints.sql`

```sql
-- Revert script for dropping constraints

ALTER TABLE education
    DROP CONSTRAINT IF EXISTS education_user_data_fk;

ALTER TABLE project
    DROP CONSTRAINT IF EXISTS project_user_data_fk;

ALTER TABLE work_experience
    DROP CONSTRAINT IF EXISTS work_experience_user_data_fk;
```

#### Verify Script: `verify/2-add-constraints.sql`

```sql
-- Verify script to check the existence of constraints

SELECT 1
FROM information_schema.table_constraints
WHERE table_schema = 'public' AND table_name = 'education'
  AND constraint_name = 'education_user_data_fk';

SELECT 1
FROM information_schema.table_constraints
WHERE table_schema = 'public' AND table_name = 'project'
  AND constraint_name = 'project_user_data_fk';

SELECT 1
FROM information_schema.table_constraints
WHERE table_schema = 'public' AND table_name = 'work_experience'
  AND constraint_name = 'work_experience_user_data_fk';
```

### Adding Changes to Sqitch Plan
Finally, add the changes to your Sqitch plan.

```sh
sqitch add create-tables -n "Create tables"
sqitch add add-constraints -n "Add constraints"
```

This setup will create and manage your database schema using Sqitch. Remember to deploy the changes using:

```sh
sqitch deploy
```

And verify the changes using:

```sh
sqitch verify
```

These scripts should help you maintain the schema changes in a structured manner using Sqitch.
