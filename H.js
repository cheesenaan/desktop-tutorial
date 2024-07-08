The issue you're encountering suggests that the connection to your PostgreSQL database is working when you run `ResumeDataDAO.js` directly, but it fails when you run your API (`index.js`) that uses the `ResumeDataDAO` class. This typically happens due to environment variables not being loaded or properly passed between different contexts, such as when running in different environments like a local script versus an API endpoint.

Here are some steps to debug and resolve the issue:

1. **Environment Variables**: Ensure that your `.env` file is being loaded correctly by both `ResumeDataDAO.js` and `index.js`. In your `index.js`, where you use `dotenv` to load environment variables, make sure it's loaded at the very beginning of the file:

   ```javascript
   require('dotenv').config();
   const api = require('lambda-api')();
   const ResumeDataDAO = require('./ResumeDataDAO');
   // ... API routes and handler
   ```

   Also, ensure that `dotenv` is correctly configured and installed (`npm install dotenv`).

2. **Path Resolution**: Double-check the path to your `.env` file and make sure it's correctly referenced in both `ResumeDataDAO.js` and `index.js`. The `.env` file should be in the root directory of your project.

3. **Dependency Injection**: Instead of relying on `dotenv` within each module, you might consider passing the configuration explicitly when creating instances of `ResumeDataDAO`. Modify `ResumeDataDAO.js` to accept a configuration object or directly pass environment variables during initialization:

   **index.js**:
   ```javascript
   require('dotenv').config();
   const api = require('lambda-api')();
   const ResumeDataDAO = require('./ResumeDataDAO');

   // Configure DAO with environment variables
   const resumeDataDAO = new ResumeDataDAO({
       host: process.env.POSTGRES_HOST,
       user: process.env.POSTGRES_USERNAME,
       password: process.env.POSTGRES_PASSWORD,
       database: process.env.POSTGRES_DATABASE,
       port: process.env.POSTGRES_PORT
   });

   api.get('/resume', async (req, res) => {
       try {
           const data = await resumeDataDAO.getAllUserData();
           res.status(200).json(data);
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   });

   exports.handler = async (event, context) => {
       return await api.run(event, context);
   };
   ```

   **ResumeDataDAO.js**:
   ```javascript
   const knex = require('knex');

   class ResumeDataDAO {
       constructor(config) {
           this.db = knex({
               client: 'pg',
               connection: {
                   host: config.host,
                   user: config.user,
                   password: config.password,
                   database: config.database,
                   port: config.port
               }
           });

           console.log('ResumeDataDAO initialized');
       }

       async getAllUserData() {
           try {
               const user_data = await this.db.raw('select * from user_data');
               return user_data.rows;
           } catch (error) {
               console.error("Error fetching users:", error.message);
               throw error;
           }
       }
   }

   module.exports = ResumeDataDAO;
   ```

   This approach ensures that the `ResumeDataDAO` instance in `index.js` uses the same configuration as when you run `ResumeDataDAO.js` directly.

4. **AWS Lambda Considerations**: If you are deploying your API to AWS Lambda, ensure that your Lambda function has the appropriate permissions and network configurations (VPC settings, security groups) to connect to your PostgreSQL database. Lambda functions run in isolated environments and require special configurations for outbound network connections.

By carefully checking these points and ensuring consistent environment variable usage and configuration passing, you should be able to resolve the `ECONNREFUSED` error and successfully connect to your PostgreSQL database from your API endpoint (`index.js`).
