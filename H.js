
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeData: null,
      error: null,
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      location: '',
      languages: '',
      university: '',
      university_location: '',
      major: '',
      gpa: '',
      coursework: '',
      company1: '',
      jobTitle1: '',
      startDate1: '',
      endDate1: '',
      description1: '',
      projectTitle1: '',
      projectDescription1: '',

    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  
  handleDateChange = (name, date) => {
    this.setState({ [name]: date });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { first_name, last_name, phone, email, location, languages, university, university_location, major, gpa, coursework, company1,jobTitle1, startDate1, endDate1, description1, projectTitle1, projectDescription1 } = this.state;
    console.log(first_name, last_name, phone, email, location, languages, university, university_location, major, gpa, coursework, company1,jobTitle1, startDate1, endDate1, description1, projectTitle1, projectDescription1);

    const response = await fetch('api/v2/saveUserData', {
      mode : 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name, last_name, phone, email, location, languages, university, university_location, major, gpa, coursework, company1,jobTitle1, startDate1, endDate1, description1, projectTitle1, projectDescription1 }),
    });

    if (response.ok) {
      const data = await response.json();
      const { success, message, userId } = data;
      if (success) {
        alert(`${message} User ID: ${userId}`);
        // Optionally, update state or perform other actions with userId
        // this.setState({ userId });
      } else {
        alert('User Data save failed!');
      }
    } else {
      alert('Network error or failed to fetch');
    }
  };

  getResumeData = async () => {
    try {
      const response = await fetch('api/v2/resume?user_id=1', { mode: 'no-cors' });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      this.setState({ resumeData: data, error: null });
    } catch (error) {
      console.error('Failed to fetch resume data:', error);
      this.setState({ error: 'Failed to fetch resume data. Please try again later.' });
    }
  };
