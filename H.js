=import React, { Component } from 'react';

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
      location: 'Alabama',
      languages: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { first_name, last_name, phone, email, location, languages } = this.state;

    const response = await fetch('/api/saveUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name, last_name, phone, email, location, languages }),
    });

    if (response.ok) {
      alert('Data saved successfully!');
    } else {
      alert('Failed to save data');
    }
  };

  handleBuildResumeClick = async () => {
    try {
      const response = await fetch('/hello', { mode: 'no-cors' });
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

  render() {
    const { resumeData, error, first_name, last_name, phone, email, location, languages } = this.state;

    return (
      <div id='resume-build'>
        <br />  <br />  <br />  <br />  <br />
        <TitleLockup
          surface="light"
          textAlignment='center'
          data={{
            title: {
              size: 'title2XLarge',
              children: 'Resume Build.',
            },
          }}
        />
        <br />  <br />  <br />  <br />  <br />
        <form id="userDataForm" onSubmit={this.handleSubmit}>
          <Input
            type="text"
            label="First name"
            name="first_name"
            value={first_name}
            onChange={this.handleChange}
            width="50%"
            required={true}
          />
          <br /><br />
          <Input
            type="text"
            label="Last name"
            name="last_name"
            value={last_name}
            onChange={this.handleChange}
            width="50%"
            required={true}
          />
          <br /><br />
          <Input
            type="tel"
            label="Phone number"
            name="phone"
            value={phone}
            onChange={this.handleChange}
            width="50%"
            required={true}
          />
          <br /><br />
          <Input
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
            width="50%"
            required={true}
          />
          <br /><br />
          <DropdownSelect
            label="Location"
            name="location"
            value={location}
            onChange={this.handleChange}
            width="50%"
            required={true}
          >
            <option value="">Select a state</option>
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="District Of Columbia">District Of Columbia</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Idaho">Idaho</option>
            <option value="Illinois">Illinois</option>
            <option value="Indiana">Indiana</option>
            <option value="Iowa">Iowa</option>
            <option value="Kansas">Kansas</option>
            <option value="Kentucky">Kentucky</option>
            <option value="Louisiana">Louisiana</option>
            <option value="Maine">Maine</option>
            <option value="Maryland">Maryland</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="Michigan">Michigan</option>
            <option value="Minnesota">Minnesota</option>
            <option value="Mississippi">Mississippi</option>
            <option value="Missouri">Missouri</option>
            <option value="Montana">Montana</option>
            <option value="Nebraska">Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="Rhode Island">Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyoming">Wyoming</option>
          </DropdownSelect>
          <br /><br />
          <Input
            type="text"
            label="Languages"
            name="languages"
            value={languages}
            onChange={this.handleChange}
            width="50%"
            required={true}
          />
          <br /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
