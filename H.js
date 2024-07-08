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
            database: process.env.POSTGRES_DATABASE
          }
      });

      console.log('ResumeDataDAO init');
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

async function fetchDataAndLog() {
  const resumeDataDAO = new ResumeDataDAO();
  try {
    const data = await resumeDataDAO.getAllUserData();
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    // Optionally, you can destroy the database connection here if needed:
    // await resumeDataDAO.destroy();
  }
}

fetchDataAndLog();
