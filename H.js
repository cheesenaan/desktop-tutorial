import axios from 'axios'; // Import axios

saveUserData = async (event) => {
  console.log(this.state);
  event.preventDefault();

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

  this.setState({ isLoading: true }, () => {
    console.log('isLoading State updated for saveUserData to true successfully:', this.state.isLoading);
  });

  try {
    // Make the POST request using axios
    const response = await axios.post('api/v1/saveUserData', {
      first_name, last_name, phone, email, location, languages,
      university, university_location, major, gpa, coursework,
      company1, jobTitle1, startDate1, endDate1, description1,
      projectTitle1, projectDescription1
    });

    // Axios automatically parses JSON responses
    const { success, message, userId } = response.data;

    if (success) {
      console.log('Success message:', message);
      console.log('Received userId:', userId);
      alert(`${message} User ID: ${userId}. You will be redirected to your resume page`);
      this.setState({ userId: userId }, () => {
        console.log('State updated successfully:', this.state.userId);
        console.log(this.state);
        window.location.replace(`https://internal-gts-j6-elast-khxjxldffinw-2045112090.us-east-1.elb.amazonaws.com/${userId}`);
      });
    } else {
      console.log('User Data save failed:', message);
      alert('User Data save failed!');
    }
  } catch (error) {
    console.error('Error saving user data:', error);
    alert('Failed to save user data. Please try again later.');
  } finally {
    this.setState({ isLoading: false }, () => {
      console.log('isLoading State for saveUserData updated to false successfully:', this.state.isLoading);
    });
  }

  console.log(this.state);
};
