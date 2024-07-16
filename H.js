const api = require('express').Router();

api.post('/api/v2/saveUserData', async (req, res) => {
    const {
        first_name,
        last_name,
        phone,
        email,
        location,
        languages,
        university,
        university_location,
        major,
        gpa,
        coursework
    } = req.body;

    // Validate input fields if needed

    const resumeDataDAO = new ResumeDataDAO();

    try {
        // Insert into user_data table
        const userId = await resumeDataDAO.sendUserData(first_name, last_name, phone, email, location, languages);

        // Insert into education table
        await resumeDataDAO.sendEducationData(userId, university, university_location, major, gpa, coursework);

        res.status(200).send("Data saved successfully");
    } catch (error) {
        console.error('Error saving user data:', error.message);
        res.status(500).send('Failed to save data');
    }
});

class ResumeDataDAO {
    async sendUserData(first_name, last_name, phone, email, location, languages) {
        try {
            const query = 'INSERT INTO user_data (first_name, last_name, phone, email, location, languages) VALUES (?, ?, ?, ?, ?, ?) RETURNING user_id';
            const values = [first_name, last_name, phone, email, location, languages];

            // Execute the query to insert into user_data and retrieve user_id
            const result = await this.db.raw(query, values);
            return result.rows[0].user_id;
        } catch (err) {
            console.error('Failed to save user data:', err.stack);
            throw err;
        }
    }

    async sendEducationData(userId, university, university_location, major, gpa, coursework) {
        try {
            const query = 'INSERT INTO education (university, location, major, gpa, coursework, user_id) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [university, university_location, major, gpa, coursework, userId];

            // Execute the query to insert into education
            await this.db.raw(query, values);
            return true; // Optional: Return a success indicator if needed
        } catch (err) {
            console.error('Failed to save education data:', err.stack);
            throw err;
        }
    }
}
