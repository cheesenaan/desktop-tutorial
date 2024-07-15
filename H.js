app.post('/saveUserData', async (req, res) => {
    print("inside in api in index.js")
    const { first_name, last_name, phone, email, location, languages } = req.body;
    print("inside 2 in api in index.js")
    const resumeDataDAO = new ResumeDataDAO();
    print("inside 3 in api in index.js")
    const data = await resumeDataDAO.sendUserData(first_name, last_name, phone, email, location, languages);
  });


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

    async sendUserData(first_name, last_name, phone, email, location, languages) {
        const { first_name, last_name, phone, email, location, languages } = req.body;
        console.log("inside DAO")
        try {
            alert("inside DAO 1 ")
            const query = 'INSERT INTO user_data (first_name, last_name, phone, email, location, languages) VALUES ($1, $2, $3, $4, $5, $6)';
            const values = [first_name, last_name, phone, email, location, languages];
            alert("inside DAO 2 ")
            await pool.query(query, values);
            alert("inside DAO 3 ")
            res.status(200).send('Data saved successfully');
          } catch (err) {
            console.error(err);
            alert("inside DAO error ")
            res.status(500).send('Failed to save data error from node js');
          }
    }
}

module.exports = ResumeDataDAO;

with sendUserData I am getting error : "message": "Missing Authentication Token"
