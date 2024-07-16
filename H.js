const api = require('lambda-api')();
require('dotenv').config();
const ResumeDataDAO = require('./ResumeDataDAO');

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


api.post('/api/v1/saveUserData', async (req, res) => {
    console.log("inside index ");
    const {first_name, last_name, phone, email, location, languages } = req.body;

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
  


exports.handler = async (event, context) => {
    return await api.run(event, context);
};
