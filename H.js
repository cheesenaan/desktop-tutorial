
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
        try {
            const query = 'INSERT INTO user_data (first_name, last_name, phone, email, location, languages) VALUES (?, ?, ?, ?, ?, ?) RETURNING user_id';
            const values = [first_name, last_name, phone, email, location, languages];

            // Execute the query to insert into user_data and retrieve user_id
            const result = await this.db.raw(query, values);
            return result.rows[0].user_id;
        } catch (err) {
            console.error('Failed to save user data:', err.stack);
            throw err;
        }
    }

    async sendEducationData(userId, university, university_location, major, gpa, coursework) {
        try {
            const query = 'INSERT INTO education (university, location, major, gpa, coursework, user_id) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [university, university_location, major, gpa, coursework, userId];

            // Execute the query to insert into education
            await this.db.raw(query, values);
            return true; // Optional: Return a success indicator if needed
        } catch (err) {
            console.error('Failed to save education data:', err.stack);
            throw err;
        }
    }

    async sendWorkExperience(userId, company, jobTitle, startDate, endDate, description) {
        try {
          const query = 'INSERT INTO work_experience (user_id, company, title, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?)';
          const values = [userId, company, jobTitle, startDate, endDate, description];
          await this.db.raw(query, values);
          return true;
        } catch (err) {
          console.error('Failed to save work experience:', err.stack);
          throw err;
        }
      }
      
      async sendProject(userId, title, description) {
        try {
          const query = 'INSERT INTO project (user_id, title, description) VALUES (?, ?, ?)';
          const values = [userId, title, description];
          await this.db.raw(query, values);
          return true;
        } catch (err) {
          console.error('Failed to save project:', err.stack);
          throw err;
        }
      }

}

module.exports = ResumeDataDAO;



