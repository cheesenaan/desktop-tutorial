To modify the `ResumeDataDAO` class and `index.js` to fetch data for a specific `user_id`, you can update the DAO methods to accept a `user_id` parameter and update the corresponding SQL queries. Then, modify the `/resume` endpoint in `index.js` to accept a `user_id` from the request.

Here is the updated code:

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

    async getUserData(user_id) {
        try {
            const user_data = await this.db.raw('SELECT * FROM user_data WHERE user_id = ?', [user_id]);
            return user_data.rows;
        } catch (error) {
            console.error("Error fetching user data:", error.message);
            throw error;
        }
    }

    async getEducationData(user_id) {
        try {
            const education_data = await this.db.raw('SELECT * FROM education WHERE user_id = ?', [user_id]);
            return education_data.rows;
        } catch (error) {
            console.error("Error fetching education data:", error.message);
            throw error;
        }
    }

    async getWorkExperienceData(user_id) {
        try {
            const work_experience_data = await this.db.raw('SELECT * FROM work_experience WHERE user_id = ?', [user_id]);
            return work_experience_data.rows;
        } catch (error) {
            console.error("Error fetching work experience data:", error.message);
            throw error;
        }
    }

    async getProjectData(user_id) {
        try {
            const project_data = await this.db.raw('SELECT * FROM project WHERE user_id = ?', [user_id]);
            return project_data.rows;
        } catch (error) {
            console.error("Error fetching project data:", error.message);
            throw error;
        }
    }

    async getResumeData(user_id) {
        try {
            const userData = await this.getUserData(user_id);
            const educationData = await this.getEducationData(user_id);
            const workExperienceData = await this.getWorkExperienceData(user_id);
            const projectData = await this.getProjectData(user_id);

            return {
                user_data: userData,
                education: educationData,
                work_experience: workExperienceData,
                projects: projectData
            };
        } catch (error) {
            console.error("Error fetching resume data:", error.message);
            throw error;
        }
    }
}

module.exports = ResumeDataDAO;
```

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
        const { user_id } = req.query; // Get user_id from query parameters
        if (!user_id) {
            return res.status(400).json({ error: 'user_id is required' });
        }

        const resumeDataDAO = new ResumeDataDAO();
        const data = await resumeDataDAO.getResumeData(user_id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.handler = async (event, context) => {
    return await api.run(event, context);
};
```

### Explanation:
1. **ResumeDataDAO.js**:
   - Modified all data fetching methods (`getUserData`, `getEducationData`, `getWorkExperienceData`, `getProjectData`) to accept a `user_id` parameter and use it in the SQL queries.
   - Added a new method `getResumeData` that fetches all related data for a specific `user_id` and returns it in a consolidated format.

2. **index.js**:
   - Updated the `/resume` endpoint to accept `user_id` from query parameters.
   - Added a check to ensure `user_id` is provided, returning a `400` error if not.
   - Used the `getResumeData` method from `ResumeDataDAO` to fetch and return all related resume data for the specified `user_id`.
