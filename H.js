const api = require('lambda-api')();
require('dotenv').config();
const ResumeDataDAO = require('./ResumeDataDAO');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3001', // Allow only requests from this origin
    methods: 'GET,POST', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};

api.use(cors(corsOptions));


api.get('/api/v2/hello', async (req, res) => {
    try {
        const data = 'hello world!';
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

api.get('/api/v2/home', async (req, res) => {
    try {
        const data = 'welcome to the home page!';
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

api.get('/api/v2/resume', async (req, res) => {
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


api.post('/api/v2/saveUserData', async (req, res) => {
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
  });
  

exports.handler = async (event, context) => {
    return await api.run(event, context);
};



Let's try to break the code into different files depending of the function of the code.

Let's have in the Index file just general code like Setting up the CORS options, reading from the configuration files, setting up the DB Access, setting up the etc.

Let's have another file just for the routes called routes.js

Let's have another file for the routes handler called handler.js In this file you basically have functions that handles the actions that occur when a route is accessed. Example:

module.exports.getResumeDetails = async (req, res) => {
  res.status(200).json(await dao.getResume());
};
