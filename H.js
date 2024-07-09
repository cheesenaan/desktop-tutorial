SELECT 'User Data' AS record_type, 
       user_id, 
       first_name, 
       last_name, 
       phone, 
       email, 
       location, 
       languages,
       NULL AS education_id, 
       NULL AS university, 
       NULL AS major, 
       NULL AS gpa, 
       NULL AS coursework,
       NULL AS project_id, 
       NULL AS title, 
       NULL AS project_description,
       NULL AS work_experience_id, 
       NULL AS job_title, 
       NULL AS company, 
       NULL AS work_description, 
       NULL AS start_date, 
       NULL AS end_date
FROM user_data
WHERE user_id = :user_id

UNION ALL

SELECT 'Education' AS record_type, 
       user_id, 
       NULL AS first_name, 
       NULL AS last_name, 
       NULL AS phone, 
       NULL AS email, 
       NULL AS user_location, 
       NULL AS languages,
       education_id, 
       university, 
       major, 
       gpa, 
       coursework,
       NULL AS project_id, 
       NULL AS title, 
       NULL AS project_description,
       NULL AS work_experience_id, 
       NULL AS job_title, 
       NULL AS company, 
       NULL AS work_description, 
       NULL AS start_date, 
       NULL AS end_date
FROM education
WHERE user_id = :user_id

UNION ALL

SELECT 'Project' AS record_type, 
       user_id, 
       NULL AS first_name, 
       NULL AS last_name, 
       NULL AS phone, 
       NULL AS email, 
       NULL AS user_location, 
       NULL AS languages,
       NULL AS education_id, 
       NULL AS university, 
       NULL AS major, 
       NULL AS gpa, 
       NULL AS coursework,
       project_id, 
       title, 
       description AS project_description,
       NULL AS work_experience_id, 
       NULL AS job_title, 
       NULL AS company, 
       NULL AS work_description, 
       NULL AS start_date, 
       NULL AS end_date
FROM project
WHERE user_id = :user_id

UNION ALL

SELECT 'Work Experience' AS record_type, 
       user_id, 
       NULL AS first_name, 
       NULL AS last_name, 
       NULL AS phone, 
       NULL AS email, 
       NULL AS user_location, 
       NULL AS languages,
       NULL AS education_id, 
       NULL AS university, 
       NULL AS major, 
       NULL AS gpa, 
       NULL AS coursework,
       NULL AS project_id, 
       NULL AS title, 
       NULL AS project_description,
       work_experience_id, 
       title AS job_title, 
       company, 
       description AS work_description, 
       start_date, 
       end_date
FROM work_experience
WHERE user_id = :user_id;
