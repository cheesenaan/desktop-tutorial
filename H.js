saveUserData = async (event) => {
  event.preventDefault();

  // Destructure state variables
  const {
    first_name, last_name, phone, email, location, languages,
    university, university_location, major, gpa, coursework,
    company1, jobTitle1, startDate1, endDate1, description1,
    projectTitle1, projectDescription1
  } = this.state;

  // Define required fields with their names
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

  // Array to store names of missing fields
  const missingFields = [];

  // Check for missing fields
  requiredFields.forEach(field => {
    if (field.value === null || field.value === '') {
      missingFields.push(field.name);
    }
  });

  // If any fields are missing, show alert and return
  if (missingFields.length > 0) {
    const missingFieldsList = missingFields.join(', ');
    alert(`Please fill in the following required fields: ${missingFieldsList}`);
    return;
  }

  // If all fields are filled, proceed with API call
  try {
    const response = await fetch('api/v2/saveUserData', {
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
        this.setState({ userId });
        alert(`${message} User ID: ${userId}`);
      } else {
        alert('User Data save failed!');
      }
    } else {
      alert('Network error or failed to fetch');
    }
  } catch (error) {
    console.error('Error saving user data:', error);
    alert('Failed to save user data. Please try again later.');
  }
};
