Sure, let's refactor your code into separate files for better organization and maintainability. Here's how you can structure it:

1. **index.js**: General setup like CORS options, reading from configuration files, setting up the API, and importing routes.
2. **routes.js**: Defines the routes and their corresponding handlers.
3. **handlers.js**: Contains the handler functions for the routes.

### 1. `index.js`
```javascript
const api = require('lambda-api')();
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');
const ResumeDataDAO = require('./ResumeDataDAO');

const corsOptions = {
    origin: 'http://localhost:3001', // Allow only requests from this origin
    methods: 'GET,POST', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};

api.use(cors(corsOptions));

// Use the routes
routes(api);

exports.handler = async (event, context) => {
    return await api.run(event, context);
};
```

### 2. `routes.js`
```javascript
const handlers = require('./handlers');

module.exports = (api) => {
    api.get('/api/v2/hello', handlers.hello);
    api.get('/api/v2/home', handlers.home);
    api.get('/api/v2/resume', handlers.getResume);
    api.post('/api/v2/saveUserData', handlers.saveUserData);
};
```

### 3. `handlers.js`
```javascript
const ResumeDataDAO = require('./ResumeDataDAO');

module.exports.hello = async (req, res) => {
    try {
        const data = 'hello world!';
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.home = async (req, res) => {
    try {
        const data = 'welcome to the home page!';
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getResume = async (req, res) => {
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
};

module.exports.saveUserData = async (req, res) => {
    console.log("inside index ");
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
      coursework,
      company1,
      jobTitle1,
      startDate1,
      endDate1,
      description1,
      projectTitle1,
      projectDescription1,
    } = req.body;
  
    // Validate input fields if needed
  
    const resumeDataDAO = new ResumeDataDAO();
  
    try {
        // Insert into user_data table
        const userId = await resumeDataDAO.sendUserData(first_name, last_name, phone, email, location, languages);
    
        // Insert into education table
        await resumeDataDAO.sendEducationData(userId, university, university_location, major, gpa, coursework);
    
        // Insert into work experience table (assuming you have a similar DAO method)
        await resumeDataDAO.sendWorkExperience(userId, company1, jobTitle1, startDate1, endDate1, description1);
    
        // Insert into project table (assuming you have a similar DAO method)
        await resumeDataDAO.sendProject(userId, projectTitle1, projectDescription1);
    
        res.status(200).json({ success: true, message: 'Data saved successfully', userId });
      } catch (error) {
        console.error('Error saving user data:', error.message);
        res.status(500).json({ success: false, message: 'Failed to save data' });
      }
};
```

### Directory Structure
```
your-project/
│
├── index.js
├── routes.js
├── handlers.js
├── ResumeDataDAO.js
├── package.json
└── .env
```

This structure separates your concerns, making the codebase easier to maintain and expand. Each file has a clear responsibility, and you can easily find and update the code related to a specific part of your application.
