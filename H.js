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

    async fetchData(query, values) {
        try {
            const result = await this.db.raw(query, values);
            return result.rows;
        } catch (error) {
            console.error("Error executing query:", error.message);
            throw error;
        }
    }

    async getUserData(user_id) {
        const query = 'SELECT * FROM user_data WHERE user_id = ?';
        return this.fetchData(query, [user_id]);
    }

    async getEducationData(user_id) {
        const query = 'SELECT * FROM education WHERE user_id = ?';
        return this.fetchData(query, [user_id]);
    }

    async getWorkExperienceData(user_id) {
        const query = 'SELECT * FROM work_experience WHERE user_id = ?';
        return this.fetchData(query, [user_id]);
    }

    async getProjectData(user_id) {
        const query = 'SELECT * FROM project WHERE user_id = ?';
        return this.fetchData(query, [user_id]);
    }

    async getResumeData(user_id) {
        try {
            const [user_data, education, work_experience, projects] = await Promise.all([
                this.getUserData(user_id),
                this.getEducationData(user_id),
                this.getWorkExperienceData(user_id),
                this.getProjectData(user_id)
            ]);

            return { user_data, education, work_experience, projects };
        } catch (error) {
            console.error("Error fetching resume data:", error.message);
            throw error;
        }
    }

    async insertData(query, values) {
        try {
            const result = await this.db.raw(query, values);
            return result.rows[0]?.user_id || true;
        } catch (error) {
            console.error("Error inserting data:", error.message);
            throw error;
        }
    }

    async sendUserData(first_name, last_name, phone, email, location, languages) {
        const query = 'INSERT INTO user_data (first_name, last_name, phone, email, location, languages) VALUES (?, ?, ?, ?, ?, ?) RETURNING user_id';
        return this.insertData(query, [first_name, last_name, phone, email, location, languages]);
    }

    async sendEducationData(user_id, university, location, major, gpa, coursework) {
        const query = 'INSERT INTO education (user_id, university, location, major, gpa, coursework) VALUES (?, ?, ?, ?, ?, ?)';
        return this.insertData(query, [user_id, university, location, major, gpa, coursework]);
    }

    async sendWorkExperience(user_id, company, title, start_date, end_date, description) {
        const query = 'INSERT INTO work_experience (user_id, company, title, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?)';
        return this.insertData(query, [user_id, company, title, start_date, end_date, description]);
    }

    async sendProject(user_id, title, description) {
        const query = 'INSERT INTO project (user_id, title, description) VALUES (?, ?, ?)';
        return this.insertData(query, [user_id, title, description]);
    }
}

module.exports = ResumeDataDAO;
