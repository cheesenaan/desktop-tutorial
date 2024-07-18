import React, { Component, Fragment } from 'react';
import HeroSection from './components/HeroSection';
import Section2 from './components/Section2';
import ResumeSection from './components/ResumeSection';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  saveUserData = async (event) => {
    event.preventDefault();
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
    } = this.state;

    const response = await fetch('api/v2/saveUserData', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
  };

  render() {
    return (
      <Fragment>
        <HeroSection />
        <Section2 />
        <ResumeSection
          state={this.state}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
          saveUserData={this.saveUserData}
        />
      </Fragment>
    );
  }
}

export default App;
