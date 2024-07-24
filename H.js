app.js

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
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
      <Fragment> 
        <VDSManager/>

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

    );
  }
}

DisplayResume.js
class DisplayResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      resumeData: null,
      error: null,
      isLoading:false,
    };
  }

  getResumeData = async () => {
    console.log("this.props.userId id is ", this.props.userId);

    if(!this.props.userId) {
      alert("user id is undefined !");
      return;
    }

    this.setState({ isLoading: true }, () => {
      console.log('isLoading State for getResumeData updated to true successfully:', this.state.isLoading); 
    });

    try {
      const response = await fetch(`api/v1/resume?user_id=${this.props.userId}`, {
      // const response = await fetch(`api/v2/resume?user_id=43`, {
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

        <div id='get_resume_data_button' style={get_resume_data_button_style}>
          <ButtonGroup
            childwidth="100%"
            viewport="desktop"
            rowQuantity={{ desktop: 2 }}
            data={[
              {
                children: 'Get resume data (test)',
                size: 'large',
                use: 'primary',
                width: 'auto',
                onClick: this.getResumeData,
              },
              {
                children: 'Cancel',
                size: 'large',
                use: 'textLink',
                width: 'auto',
              },
            ]}
            alignment="center"
          />
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}
        {resumeData && (
