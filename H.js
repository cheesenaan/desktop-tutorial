To integrate work experience and project data into your existing Node.js backend and React frontend setup, you'll need to extend your form handling, API endpoint, and database interaction accordingly. Here's how you can approach it:

### 1. Update React Form Component (`apps.js`)

You have a form component where users can input their basic information (`first_name`, `last_name`, `phone`, `email`, `location`, `languages`, `university`, `university_location`, `major`, `gpa`, `coursework`). Now, you want to add fields for work experience and projects.

Below is a simplified approach for handling work experience and projects. You may need to adjust it based on your exact requirements and UI components (`Input`, `DatePicker`, etc.):

```jsx
<Input 
  type="text" 
  width="50%"
  label="Company 1"
  name="company1"
  value={this.state.company1}
  onChange={this.handleChange}
  required={true}
/>
<br /><br />
<Input 
  type="text" 
  width="50%"
  label="Job Title 1"
  name="jobTitle1"
  value={this.state.jobTitle1}
  onChange={this.handleChange}
  required={true}
/>
<br /><br />
<DatePicker
  dateFormat="MM/DD/YYYY"
  width="70.75%"
  label="Start Date 1"
  name="startDate1"
  selected={this.state.startDate1}
  onChange={(date) => this.handleDateChange('startDate1', date)}
/>
<br /><br />
<DatePicker
  dateFormat="MM/DD/YYYY"
  width="70.75%"
  label="End Date 1"
  name="endDate1"
  selected={this.state.endDate1}
  onChange={(date) => this.handleDateChange('endDate1', date)}
/>
<br /><br />
<Input 
  type="text" 
  width="50%"
  label="Description 1"
  name="description1"
  value={this.state.description1}
  onChange={this.handleChange}
  required={true}
/>
<br /><br />
<Input 
  type="text" 
  width="50%"
  label="Project Title 1"
  name="projectTitle1"
  value={this.state.projectTitle1}
  onChange={this.handleChange}
  required={true}
/>
<br /><br />
<Input 
  type="text" 
  width="50%"
  label="Project Description 1"
  name="projectDescription1"
  value={this.state.projectDescription1}
  onChange={this.handleChange}
  required={true}
/>
<br /><br />
```

### 2. Update `handleChange` Method in React Component

Update the `handleChange` method to handle changes in these new fields:

```jsx
handleChange = (event) => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
};

handleDateChange = (name, date) => {
  this.setState({ [name]: date });
};
```

### 3. Update Node.js Backend (`index.js`)

Modify your existing `/api/v2/saveUserData` endpoint to handle these additional fields for work experience and projects. Here's an example:

```javascript
api.post('/api/v2/saveUserData', async (req, res) => {
  console.log("inside index ");
  const {
    first_name,
    last_name,
    phone,
    email,
    location,
    languages,
    university,
    university_location,
    major,
    gpa,
    coursework,
    company1,
    jobTitle1,
    startDate1,
    endDate1,
    description1,
    projectTitle1,
    projectDescription1,
  } = req.body;

  // Validate input fields if needed

  const resumeDataDAO = new ResumeDataDAO();

  try {
    // Insert into user_data table
    const userId = await resumeDataDAO.sendUserData(first_name, last_name, phone, email, location, languages);

    // Insert into education table
    await resumeDataDAO.sendEducationData(userId, university, university_location, major, gpa, coursework);

    // Insert into work experience table (assuming you have a similar DAO method)
    await resumeDataDAO.sendWorkExperience(userId, company1, jobTitle1, startDate1, endDate1, description1);

    // Insert into project table (assuming you have a similar DAO method)
    await resumeDataDAO.sendProject(userId, projectTitle1, projectDescription1);

    res.status(200).send("Data saved successfully");
  } catch (error) {
    console.error('Error saving user data:', error.message);
    res.status(500).send('Failed to save data');
  }
});
```

### 4. Update DAO Methods in Node.js Backend

Update your DAO methods (`sendWorkExperience` and `sendProject`) to handle the insertion into respective tables (`work_experience` and `project`).

### Example DAO Methods (in `ResumeDataDAO` class):

```javascript
async sendWorkExperience(userId, company, jobTitle, startDate, endDate, description) {
  try {
    const query = 'INSERT INTO work_experience (user_id, company, job_title, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?)';
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
```

### Notes:

- Ensure your database schema (`work_experience`, `project`) matches the queries used in DAO methods.
- Implement appropriate error handling and validation based on your application requirements.
- Adjust the frontend and backend code as per your actual UI components and API structure.

By following these steps, you can integrate handling for work experience and project data into your existing application flow. Adjustments may be needed based on your specific requirements and the exact structure of your frontend and backend components.
