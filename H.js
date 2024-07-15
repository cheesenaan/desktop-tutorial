async sendUserData(req, res) {
        try {
            const query = 'INSERT INTO user_data (user_id, first_name, last_name, phone, email, location, languages) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [4, 'hassan', 'farooq', '9174565697', 'test@gmail.com', 'Alabama', 'spanish'];
            
            // Logging the query and values for debugging
            console.log('Executing query:', query);
            console.log('With values:', values);
    
            await this.db.raw(query, values);
            res.status(200).send('Data saved successfully');
        } catch (err) {
            // Logging the error stack for detailed information
            console.error('Failed to save data:', err.stack);
            res.status(500).send('Failed to save data, error from Node.js DAO');
        }
    }


for this code, the data is being saved in the backend but i still get the error "Error saving user data: Cannot read property 'status' of undefined"
