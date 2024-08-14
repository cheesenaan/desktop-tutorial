const ResumeSection = ({
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
  saveUserData
}) => {
  const [formData, setFormData] = useState({
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
    projectDescription1
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: date
    }));
  };

  const handleSaveUserData = async (event) => {
    event.preventDefault();

    const {
      first_name, last_name, phone, email, location, languages,
      university, university_location, major, gpa, coursework,
      company1, jobTitle1, startDate1, endDate1, description1,
      projectTitle1, projectDescription1,
    } = formData;

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

    setIsLoading(true);

    try {
      // Make the POST request using axios
      const response = await axios.post('api/v1/saveUserData', formData);

      // Axios automatically parses JSON responses
      const { success, message, userId } = response.data;

      if (success) {
        alert(`${message} User ID: ${userId}. You will be redirected to your resume page`);
        window.location.replace(`https://internal-gts-j6-elast-khxjxldffinw-2045112090.us-east-1.elb.amazonaws.com/${userId}`);
      } else {
        alert('User Data save failed!');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('Failed to save user data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
