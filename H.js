index.js
api.post('/saveUserData', async (req, res) => {
    const resumeDataDAO = new ResumeDataDAO();
    try {
        await resumeDataDAO.sendUserData();
        res.status(200).send("data saved successfuly");
    } catch (error) {
        console.error('Error saving user data:', error.message);
        res.status(500).send('Failed to save data');
    }
});

DAO.js
async sendUserData(req, res) {
        try {
            const query = 'INSERT INTO user_data (user_id, first_name, last_name, phone, email, location, languages) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [2, 'hassan', 'farooq', '9174565697', 'test@gmail.com', 'Alabama', 'spanish'];
            
            // Logging the query and values for debugging
            console.log('Executing query:', query);
            console.log('With values:', values);
    
            await this.db.raw(query, values);
            return res.status(200).send('Data saved successfully');
        } catch (err) {
            // Logging the error stack for detailed information
            console.error('Failed to save data:', err.stack);
            res.status(500).send('Failed to save data, error from Node.js DAO');
        }
    }


change the code so that user_id, first_name, last_name, phone, email, location, languages is user input
