Let's break down the requirements and create the necessary code step-by-step:

1. **Configure NPM Registry**
2. **Install dependencies**
3. **Set up environment configuration (optional)**
4. **Create the SAM Template**
5. **Create the Lambda Handler**
6. **Create a Data Access Object (DAO)**
7. **Set up the Knex.js Configuration**
8. **Create and Test the API Endpoint**

### 1. Configure NPM Registry

Follow the instructions to set up NPM to point to Verizon's Artifactory:

1. Login to Artifactory.
2. In the top right, click your username.
3. In the drop-down, click "Set Me Up."
4. Click NPM.
5. In the top dropdown, select "npm-virtual."
6. Copy the first command, `npm config set registry ...`, and run it in your terminal.
7. Run `npm login` and follow the link to your browser to authenticate.

### 2. Install Dependencies

Install the required libraries:

```sh
npm install lambda-api knex dotenv
```

### 3. Set Up Environment Configuration (Optional)

Create a `.env` file in the `functions/resume` directory to manage configurations:

```sh
touch functions/resume/.env
```

Add your environment variables in `.env`:

```sh
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
```

### 4. Create the SAM Template

Create a `template.yaml` in the root directory:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31'
Resources:
  ResumeFunction:
    Type: 'AWS::Serverless::Function'
    Properties: 
      Handler: functions/resume/index.handler
      Runtime: nodejs14.x
      CodeUri: .
      Environment:
        Variables:
          DB_HOST: !Ref DBHost
          DB_USER: !Ref DBUser
          DB_PASS: !Ref DBPass
          DB_NAME: !Ref DBName
      Events:
        ResumeApi:
          Type: Api
          Properties:
            Path: /api/v1/resume
            Method: get
Parameters:
  DBHost:
    Type: String
  DBUser:
    Type: String
  DBPass:
    Type: String
  DBName:
    Type: String
Outputs:
  ResumeApi:
    Description: "API Gateway endpoint URL for Resume function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/api/v1/resume"
```

### 5. Create the Lambda Handler

Create the `index.js` file in `functions/resume`:

```javascript
const api = require('lambda-api')();
const ResumeDAO = require('./resumeDAO');
require('dotenv').config();

api.get('/api/v1/resume', async (req, res) => {
    try {
        const dao = new ResumeDAO();
        const data = await dao.getResumeData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.handler = async (event, context) => {
    return await api.run(event, context);
};
```

### 6. Create a Data Access Object (DAO)

Create a `resumeDAO.js` file in `functions/resume`:

```javascript
const knex = require('knex');

class ResumeDAO {
    constructor() {
        this.db = knex({
            client: 'mysql',
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME
            }
        });
    }

    async getResumeData() {
        try {
            const data = await this.db.select('*').from('resumes');
            return {
                field: "value",
                dataset: data
            };
        } catch (error) {
            throw new Error('Error retrieving resume data');
        }
    }
}

module.exports = ResumeDAO;
```

### 7. Set Up Knex.js Configuration

Ensure you have Knex.js properly set up to connect to your database. If you need to initialize a new database, follow Knex.js documentation for database migration and seeding.

### 8. Start the SAM Local API Gateway

Run the following command in the terminal:

```sh
sam local start-api
```

### 9. Test the API with a Web Browser or Postman

Open Postman and create a new GET request to the following URL:

```
http://localhost:3000/api/v1/resume
```

You should receive a response with your resume data.

By following these steps, you will have a serverless application set up with AWS SAM, including an API Gateway, Lambda function, and a connection to a database using Knex.js.
