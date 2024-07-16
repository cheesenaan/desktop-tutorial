index.js file

const api = require('lambda-api')();
require('dotenv').config();
const ResumeDataDAO = require('./ResumeDataDAO');


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


ResumeDataDAO.js file

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
        console.log(process.env.POSTGRES_HOST);
    }

    async getUserData(user_id) {
        try {
            const user_data = await this.db.raw('resume = ?', [user_id]);
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


        in postman when i run get http://127.0.0.1:3000/resume?user_id=1 i get error     "error": "resume = $1 - syntax error at or near \"resume\""

