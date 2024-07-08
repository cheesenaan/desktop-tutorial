To fix the code for the `/resume` API endpoint to work correctly with the `ResumeDataDAO`, you need to ensure that the database connection is properly initialized and utilized within the DAO. Here’s a corrected version of your code:

**index.js**

```javascript
const api = require('lambda-api')();
require('dotenv').config();
const ResumeDataDAO = require('./ResumeDataDAO');

api.get('/hello', async (req, res) => {
    try {
        const data = 'hello world!';
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

api.get('/home', async (req, res) => {
    try {
        const data = 'welcome to the home page!';
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

api.get('/resume', async (req, res) => {
    try {
        const resumeDataDAO = new ResumeDataDAO();
        const data = await resumeDataDAO.getAllUserData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.handler = async (event, context) => {
    return await api.run(event, context);
};
```

**ResumeDataDAO.js**

```javascript
require('dotenv').config();
const knex = require('knex');

class ResumeDataDAO {
    constructor() {
        this.db = knex({
            client: 'pg',
            connection: {
                host: process.env.POSTGRES_HOST,
                user: process.env.POSTGRES_USERNAME,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DATABASE,
                port: process.env.POSTGRES_PORT
            }
        });

        console.log('ResumeDataDAO initialized');
    }

    async getAllUserData() {
        try {
            const user_data = await this.db.raw('select * from user_data');
            return user_data.rows; // Assuming 'user_data' is an object with a 'rows' property containing the fetched data
        } catch (error) {
            console.error("Error fetching users:", error.message);
            throw error;
        }
    }
}

module.exports = ResumeDataDAO;
```

### Explanation:

1. **index.js**: 
   - The `/resume` endpoint initializes an instance of `ResumeDataDAO` and calls `getAllUserData()` to fetch data from the database.
   - Errors are caught and returned with a 500 status code if something goes wrong.

2. **ResumeDataDAO.js**:
   - The `ResumeDataDAO` class constructor initializes a `knex` instance with PostgreSQL configuration from environment variables.
   - `getAllUserData()` method executes a raw SQL query to fetch all rows from a `user_data` table and returns the result.

### Checklist for Setup:

- Ensure your `.env` file is correctly configured with PostgreSQL database credentials (`POSTGRES_HOST`, `POSTGRES_USERNAME`, `POSTGRES_PASSWORD`, `POSTGRES_DATABASE`, `POSTGRES_PORT`).
- Verify that the `user_data` table exists in your PostgreSQL database and has data.
- Ensure your AWS Lambda execution environment has access to the PostgreSQL database (correct VPC settings, security group configurations, etc.).

With these adjustments, your `/resume` API endpoint should function correctly, retrieving data from your PostgreSQL database using `knex` and returning it as JSON.
