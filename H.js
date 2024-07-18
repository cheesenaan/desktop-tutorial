 saveUserData = async (event) => {
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
        this.setState({ userId });
        alert(`${message} User ID: ${userId}`);
      } else {
        alert('User Data save failed!');
      }
    } else {
      alert('Network error or failed to fetch');
    }
  };
