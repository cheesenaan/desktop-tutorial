BEGIN;

-- Insert into user_data table and capture user_id
WITH inserted_user AS (
    INSERT INTO user_data (first_name, last_name, phone, email, location, languages)
    VALUES ('John', 'Doe', 1234567890, 'john.doe@example.com', 'New York', 'English, Spanish')
    RETURNING user_id
)
-- Insert into education table using the captured user_id
INSERT INTO education (university, major, gpa, coursework, location, user_id)
SELECT 'Example University', 'Computer Science', 3.8, 'Advanced Programming, Database Management', 'New York', user_id
FROM inserted_user;

COMMIT;
