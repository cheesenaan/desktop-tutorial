To render a new HTML page with the URL `localhost/user_id` that displays the resume for any user ID, you can use React Router to manage the routes and dynamic URL parameters. This allows you to create a separate page component to display the resume data.

First, install React Router if you haven't already:

```bash
npm install react-router-dom
```

Next, set up React Router in your `App.js` file and create a new component, `ResumePage`, to display the resume data. Here’s how you can modify your code:

### Step 1: Update `App.js`

Add React Router and create routes for the main application and the resume page.

```jsx
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VDSManager from './VDSManager';
import HeroSection from './HeroSection';
import Section2 from './Section2';
import ResumeSection from './ResumeSection';
import Loader from './Loader';
import DisplayResume from './DisplayResume';
import ResumePage from './ResumePage'; // Import the new ResumePage component

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userId: null,
      first_name: 'sulemaan',
      last_name: 'farooq',
      phone: '1111111111',
      email: 'test@verizon.com',
      location: 'NJ',
      languages: 'English, Spanish',
      university: 'Rutgers',
      university_location: 'NJ',
      major: 'Computer Science',
      gpa: '3.5',
      coursework: 'AI, ML',
      company1: 'Verizon',
      jobTitle1: 'Software Engineer',
      startDate1: '01/01/2023',
      endDate1: '01/01/2024',
      description1: 'full stack engineer. node js, aws sam, yaml, react, jenkins',
      projectTitle1: 'trading app',
      projectDescription1: 'flask app to trade 1500 stocks',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDateChange = (name, date) => {
    this.setState({ [name]: date });
  };

  saveUserData = async (event) => {
    console.log(this.state);
    event.preventDefault();

    this.setState({ isLoading: true }, () => {
      console.log('isLoading State updated for saveUserData to true successfully:', this.state.isLoading);
    });

    const {
      first_name, last_name, phone, email, location, languages,
      university, university_location, major, gpa, coursework,
      company1, jobTitle1, startDate1, endDate1, description1,
      projectTitle1, projectDescription1,
    } = this.state;

    const requiredFields = [
      { value: first_name, name: 'First Name' },
      { value: last_name, name: 'Last Name' },
      { value: phone, name: 'Phone Number' },
      { value: email, name: 'Email Address' },
      { value: location, name: 'Location' },
      { value: languages, name: 'Languages' },
      { value: university, name: 'University' },
      { value: university_location, name: 'University Location' },
      { value: major, name: 'Major' },
      { value: gpa, name: 'GPA' },
      { value: coursework, name: 'Coursework' },
      { value: company1, name: 'Company Name (Job 1)' },
      { value: jobTitle1, name: 'Job Title (Job 1)' },
      { value: startDate1, name: 'Start Date (Job 1)' },
      { value: endDate1, name: 'End Date (Job 1)' },
      { value: description1, name: 'Description (Job 1)' },
      { value: projectTitle1, name: 'Project Title (Project 1)' },
      { value: projectDescription1, name: 'Project Description (Project 1)' }
    ];

    const missingFields = [];

    requiredFields.forEach(field => {
      if (field.value === null || field.value === '') {
        missingFields.push(field.name);
      }
    });

    if (missingFields.length > 0) {
      const missingFieldsList = missingFields.join(', ');
      alert(`Please fill in the following required fields: ${missingFieldsList}`);
      return;
    }

    try {
      const response = await fetch('api/v1/saveUserData', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name, last_name, phone, email, location, languages,
          university, university_location, major, gpa, coursework,
          company1, jobTitle1, startDate1, endDate1, description1,
          projectTitle1, projectDescription1
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { success, message, userId } = data;
        if (success) {
          console.log('Success message:', message);
          console.log('Received userId:', userId);
          alert(`${message} User ID: ${userId}`);
          this.setState({ userId: userId }, () => {
            console.log('State updated successfully:', this.state.userId);
            console.log(this.state);
          });
        } else {
          console.log('User Data save failed:', message);
          alert('User Data save failed!');
        }
      } else {
        alert('Network error or failed to fetch');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('Failed to save user data. Please try again later.');
    }

    this.setState({ isLoading: false }, () => {
      console.log('isLoading State for saveUserData updated to false successfully:', this.state.isLoading);
    });

    console.log(this.state);
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Fragment>
              <VDSManager />

              <HeroSection />

              <Section2 />

              <ResumeSection
                state={this.state}
                handleChange={this.handleChange}
                handleDateChange={this.handleDateChange}
                saveUserData={this.saveUserData}
              />

              <Loader
                active={this.state.isLoading}
                fullscreen={true}
                surface="light"
              />

              <DisplayResume
                userId={this.state.userId}
              />

            </Fragment>
          </Route>
          <Route path="/:userId" component={ResumePage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
```

### Step 2: Create `ResumePage.js`

Create a new component `ResumePage` to fetch and display the resume data for the given user ID.

```jsx
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loader from './Loader';

class ResumePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.userId,
      resumeData: null,
      error: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getResumeData();
  }

  getResumeData = async () => {
    const { userId } = this.state;
    console.log("userId id is ", userId);

    if (!userId) {
      alert("User ID is undefined!");
      return;
    }

    this.setState({ isLoading: true }, () => {
      console.log('isLoading State for getResumeData updated to true successfully:', this.state.isLoading);
    });

    try {
      const response = await fetch(`api/v1/resume?user_id=${userId}`, {
        mode: 'no-cors', // Adjust as per your CORS setup
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      this.setState({ resumeData: data, error: null });
    } catch (error) {
      console.error('Failed to fetch resume data:', error);
      this.setState({ error: 'Failed to fetch resume data. Please try again later.' });
    }

    this.setState({ isLoading: false }, () => {
      console.log('isLoading State for getResumeData updated to false successfully:', this.state.isLoading);
    });
  };

  render() {
    const { resumeData, error } = this.state;

    return (
      <div>
        <Loader
          active={this.state.isLoading}
          fullscreen={true}
          surface="light"
        />

        {error && <div style={{ color: 'red' }}>{error}</div>}
        {resumeData && (
          <div>
            {/* Render resume data here */}
            <h1>{resumeData.first_name} {resumeData.last_name}</h1>
            <p>{resumeData.email}</p>
            {/* Add more fields as needed */}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ResumePage);
```

Now, when you navigate to `localhost/user_id`, the `ResumePage` component will fetch and display the resume data for the given `user_id`. This approach uses React Router to handle dynamic URL
