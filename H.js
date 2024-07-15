To modify your code so that `user_id`, `first_name`, `last_name`, `phone`, `email`, `location`, and `languages` are taken from user input via the request body (`req.body`), you need to adjust both your API endpoint and DAO function. Here’s how you can refactor your code:

**index.js (API Endpoint):**

```javascript
const ResumeDataDAO = require('./DAO'); // Import your DAO class

api.post('/saveUserData', async (req, res) => {
    const { user_id, first_name, last_name, phone, email, location, languages } = req.body;

    // Validate input fields if needed

    const resumeDataDAO = new ResumeDataDAO();

    try {
        await resumeDataDAO.sendUserData(user_id, first_name, last_name, phone, email, location, languages);
        res.status(200).send("Data saved successfully");
    } catch (error) {
        console.error('Error saving user data:', error.message);
        res.status(500).send('Failed to save data');
    }
});
```

**DAO.js (DAO Function):**

```javascript
class ResumeDataDAO {
    constructor(db) {
        this.db = db; // Assuming you pass your database connection or knex instance to the DAO constructor
    }

    async sendUserData(user_id, first_name, last_name, phone, email, location, languages) {
        try {
            const query = 'INSERT INTO user_data (user_id, first_name, last_name, phone, email, location, languages) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [user_id, first_name, last_name, phone, email, location, languages];
            
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
}

module.exports = ResumeDataDAO;
```

### Explanation:

1. **index.js (API Endpoint):**
   - Imports the `ResumeDataDAO` class.
   - Parses `user_id`, `first_name`, `last_name`, `phone`, `email`, `location`, and `languages` from `req.body`.
   - Creates an instance of `ResumeDataDAO`.
   - Calls `sendUserData` method with the parsed values.
   - Handles success and error responses accordingly.

2. **DAO.js (DAO Function):**
   - Defines `sendUserData` method to accept parameters (`user_id`, `first_name`, etc.).
   - Constructs the SQL query dynamically using placeholders (`?`).
   - Executes the query using the database connection (`this.db.raw(query, values)`).
   - Logs the executed query and its values for debugging purposes.
   - Catches and logs any errors that occur during the query execution.

### Notes:

- Ensure your `api` and `ResumeDataDAO` class are properly configured and connected to your Node.js application and database.
- Validate and sanitize user input (`req.body`) to prevent SQL injection and other security vulnerabilities.
- Adjust the `this.db.raw` method based on your actual database library or ORM (like Knex, Sequelize, etc.) and ensure it handles parameterized queries correctly.

This structure ensures that user-provided data is securely passed through your application to be inserted into your PostgreSQL database.
