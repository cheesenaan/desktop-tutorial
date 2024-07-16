BEGIN;

-- Insert into user_data table and capture user_id
WITH inserted_user AS (
    INSERT INTO user_data (first_name, last_name, phone, email, location, languages)
    VALUES ('sulemaan', 'farooq', 9174565697, 'sule.doe@example.com', 'New Jersey', 'English, Urdu')
    RETURNING user_id
)
-- Insert into education table using the captured user_id
INSERT INTO education (university, major, gpa, coursework, location, user_id)
SELECT 'Rutgers', 'Computer Science', 3.8, 'AI, ML, DS', 'New Jersey', user_id
FROM inserted_user;

COMMIT;


api.post('/api/v2/saveUserData', async (req, res) => {
    console.log("inside index ");
    const {first_name, last_name, phone, email, location, languages, university, university_location, major, gpa, coursework } = req.body;

    // Validate input fields if needed

    const resumeDataDAO = new ResumeDataDAO();

    try {
        await resumeDataDAO.sendUserData(first_name, last_name, phone, email, location, languages);
        res.status(200).send("Data saved successfully");
    } catch (error) {
        console.error('Error saving user data:', error.message);
        res.status(500).send('Failed to save data');
    }
});


async sendUserData(first_name, last_name, phone, email, location, languages, university, university_location, major, gpa, coursework) {
        try {
            const query = 'INSERT INTO user_data (first_name, last_name, phone, email, location, languages) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [first_name, last_name, phone, email, location, languages];
            
            // Logging the query and values for debugging
            console.log('Executing query:', query);
            console.log('With values:', values);
    
            await this.db.raw(query, values);
            return true; // Optional: Return a success indicator if needed
        } catch (err) {
            // Logging the error stack for detailed information
            console.error('Failed to save data:', err.stack);
            throw err; // Re-throw the error to be caught by the calling function
        }
    }

