index.js

const api = require('lambda-api')();
require('dotenv').config();
const knex = require('knex');
const ResumeDataDAO = require('./ResumeDataDAO.js');

api.get('/hello', async (req, res) => {
    try {
        const data = 'hello world!'
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

api.get('/home', async (req, res) => {
    try {
        const data = 'welcome to the home page!'
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

api.get('/resume', async (req, res) => {
    try {
        const resumeDataDAO = new ResumeDataDAO();
        const data = await resumeDataDAO.getAllUserData();
        res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

exports.handler = async (event, context) => {
    return await api.run(event, context);
};




ResumeDataDAO.js

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
            port : process.env.POSTGRES_PORT
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


module.exports = ResumeDataDAO;


