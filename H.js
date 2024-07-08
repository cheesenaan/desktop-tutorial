require('dotenv').config();
const knex = require('knex');

class ResumeDataDAO {
  constructor() {
      this.db = knex ({
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
        // console.log("log:", user_data)
        return user_data;
      } catch (error) {
        console.error("erro fetching users:" , error.message);
        throw error;
      }
  }
}

module.exports = ResumeDataDAO;


const resumeDataDAO = new ResumeDataDAO();
const data = resumeDataDAO.getAllUserData();
console.log("from object:", data);

[sulefa8@10-119-227-72 resume]$ node ResumeDataDAO.js 
ResumeDataDAO init
from object: Promise { <pending> }
