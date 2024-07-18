To organize your React app into different files, you can break down the components and styles into separate files. Here's how you can do it:

1. **Create separate files for components:**
   - Create a folder called `components` inside your `src` directory.
   - Move each component into its own file.

2. **Create a file for each CSS style:**
   - Create a folder called `styles` inside your `src` directory.
   - Move each style into its own file.

Here's an example structure for your project:

```
src/
├── components/
│   ├── HeroSection.js
│   ├── Section2.js
│   ├── ResumeBuild.js
│   ├── DisplayResume.js
│   └── Form.js
├── styles/
│   ├── App.css
│   └── Components.css
├── App.js
└── index.js
```

Now, let's create each component and import them into `App.js`.

### HeroSection.js

```jsx
import React from 'react';
import { TileContainer, TitleLockup, ButtonGroup, Icon } from '@vds/utilities';
import { heroStyle, centerDivStyle, iconStyle } from '../styles/Components.css';

const HeroSection = () => (
  <div id="heroSection" style={heroStyle}>
    <TileContainer
      id="hero-header"
      padding="0px"
      aspectRatio="16:9"
      width="100%"
      height="200px"
      backgroundColor="black"
    >
      <TitleLockup
        surface="dark"
        textAlignment="center"
        data={{
          eyebrow: {
            size: 'titleMedium',
            children: 'Get Started ‎ ‎ ‎  Learn More ‎ ‎ ‎  About me ‎ ‎ ‎   Support',
            bold: 'true',
          },
        }}
      />
    </TileContainer>
    <TileContainer
      id="hero-title-section"
      padding="0px"
      aspectRatio="16:9"
      width="100%"
      height="450px"
      backgroundColor="black"
    >
      <div style={centerDivStyle}>
        <TitleLockup
          id="hero-title"
          surface="dark"
          textAlignment="center"
          data={{
            title: {
              size: 'title2XLarge',
              children: 'Resume 2x the speed.',
            },
            subtitle: {
              size: 'titleSmall',
              children: 'Unlock your career potential.',
            },
          }}
        />
        <br />
        <ButtonGroup
          id="hero-buttons"
          childWidth="100%"
          viewport="desktop"
          surface="dark"
          rowQuantity={{ desktop: 2 }}
          alignment="center"
          data={[
            {
              children: 'Get Started',
              size: 'large',
              use: 'primary',
              width: '250px',
              onClick: () => alert('You clicked the Button example!'),
            },
            {
              children: 'Learn more',
              size: 'large',
              use: 'secondary',
              width: '250px',
              onClick: () => alert('You clicked the Button example!'),
            },
          ]}
        />
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <div id="hero-down-caret" style={iconStyle}>
          <Icon name="down-caret" size="XLarge" color="#FFFFFF" />
        </div>
      </div>
    </TileContainer>
  </div>
);

export default HeroSection;
```

### Section2.js

```jsx
import React from 'react';
import { TileletCarousel, TitleLockup } from '@vds/utilities';
import { section2 } from '../styles/Components.css';

const Section2 = () => (
  <div id="section2" style={section2}>
    <TitleLockup
      id="section2-title"
      surface="light"
      textAlignment="center"
      data={{
        title: {
          size: 'title2XLarge',
          children: 'Resume 4x features.',
        },
      }}
    />
    <br /> <br /> <br /> <br /> <br />
    <TileletCarousel
      id="section2-carousel"
      layout="3UP"
      gutter="24px"
      peek="standard"
      surface="light"
      paginationFill="light"
      paginationInset="12px"
      paginationDisplay="onHover"
      aspectRatio="1:1"
      data={[
        {
          title: {
            size: 'titleLarge',
            primitive: 'h1',
            children: 'ATS',
          },
          subtitle: {
            size: 'bodyLarge',
            primitive: 'h1',
            children: 'Resumes are optimized for ATS (Application Tracking System)',
          },
          descriptiveIcon: {
            size: 'medium',
          },
          backgroundColor: 'black',
          showBorder: true,
          onClick: () => {},
        },
        {
          title: {
            size: 'titleLarge',
            primitive: 'h1',
            children: 'Resume bullets generated with genAI',
          },
          backgroundColor: 'white',
          backgroundImage:
            'https://ss7.vzw.com/is/image/VerizonWireless/vz-homepage-m-ourlatest-2?scl=1',
          onClick: () => {},
        },
        {
          title: {
            size: 'titleLarge',
            primitive: 'h1',
            children: 'Website',
          },
          subtitle: {
            size: 'bodyLarge',
            primitive: 'h1',
            children: 'Complementary personal website at resume2x.com/name',
          },
          backgroundColor: 'white',
          showBorder: true,
          onClick: () => {},
        },
        {
          title: {
            size: 'titleLarge',
            primitive: 'h1',
            children: 'Powered by Verizon 5G Ultra Wideband',
          },
          backgroundColor: 'gray',
          onClick: () => {},
        },
        {
          title: {
            size: 'titleLarge',
            primitive: 'h1',
            children: 'Resume built in less than 30 seconds',
          },
          backgroundColor: 'white',
          backgroundImage:
            'https://ss7.vzw.com/is/image/VerizonWireless/vz-homepage-d-june1-Tile22?&?scl=1',
          showBorder: true,
          onClick: () => {},
        },
      ]}
    />
  </div>
);

export default Section2;
```

### ResumeBuild.js

```jsx
import React, { Component } from 'react';
import { TitleLockup, Input, DropdownSelect, RadioButtonGroup, ButtonGroup, DatePicker } from '@vds/utilities';
import { resumeBuild, formStyle, resumeSubmitButton } from '../styles/Components.css';

class ResumeBuild extends Component {
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

  handleSubmit = async (event) => {
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
    console.log(
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
    );

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

    return (
      <div id="resume-build" style={resumeBuild}>
        <TitleLockup
          id="resume-build-title"
          surface="light"
          textAlignment="center"
          data={{
            title: {
              size: 'title2XLarge',
              children: 'Resume Builder',
            },
          }}
        />
        <br />
        <form id="resume-build-form" style={formStyle} onSubmit={this.handleSubmit}>
          <Input
            id="first_name"
            label="First Name"
            onChange={this.handleChange}
            value={first_name}
            required
          />
          <Input
            id="last_name"
            label="Last Name"
            onChange={this.handleChange}
            value={last_name}
            required
          />
          <Input
            id="phone"
            label="Phone"
            onChange={this.handleChange}
            value={phone}
            required
          />
          <Input
            id="email"
            label="Email"
            onChange={this.handleChange}
            value={email}
            required
          />
          <Input
            id="location"
            label="Location"
            onChange={this.handleChange}
            value={location}
            required
          />
          <Input
            id="languages"
            label="Languages"
            onChange={this.handleChange}
            value={languages}
            required
          />
          <Input
            id="university"
            label="University"
            onChange={this.handleChange}
            value={university}
            required
          />
          <Input
            id="university_location"
            label="University Location"
            onChange={this.handleChange}
            value={university_location}
            required
          />
          <Input
            id="major"
            label="Major"
            onChange={this.handleChange}
            value={major}
            required
          />
          <Input id="gpa" label="GPA" onChange={this.handleChange} value={gpa} required />
          <Input
            id="coursework"
            label="Coursework"
            onChange={this.handleChange}
            value={coursework}
            required
          />
          <Input
            id="company1"
            label="Company"
            onChange={this.handleChange}
            value={company1}
            required
          />
          <Input
            id="jobTitle1"
            label="Job Title"
            onChange={this.handleChange}
            value={jobTitle1}
            required
          />
          <DatePicker
            id="startDate1"
            label="Start Date"
            onChange={(date) => this.handleDateChange('startDate1', date)}
            value={startDate1}
            required
          />
          <DatePicker
            id="endDate1"
            label="End Date"
            onChange={(date) => this.handleDateChange('endDate1', date)}
            value={endDate1}
            required
          />
          <Input
            id="description1"
            label="Description"
            onChange={this.handleChange}
            value={description1}
            required
          />
          <Input
            id="projectTitle1"
            label="Project Title"
            onChange={this.handleChange}
            value={projectTitle1}
            required
          />
          <Input
            id="projectDescription1"
            label="Project Description"
            onChange={this.handleChange}
            value={projectDescription1}
            required
          />
          <ButtonGroup
            id="resume-submit"
            childWidth="100%"
            viewport="desktop"
            surface="light"
            rowQuantity={{ desktop: 1 }}
            alignment="center"
            data={[
              {
                children: 'Submit',
                size: 'large',
                use: 'primary',
                width: '250px',
                onClick: this.handleSubmit,
              },
            ]}
            style={resumeSubmitButton}
          />
        </form>
      </div>
    );
  }
}

export default ResumeBuild;
```

### DisplayResume.js

```jsx
import React from 'react';
import { TitleLockup } from '@vds/utilities';
import { displayResume } from '../styles/Components.css';

const DisplayResume = ({ data }) => (
  <div id="display-resume" style={displayResume}>
    <TitleLockup
      id="resume-display-title"
      surface="light"
      textAlignment="center"
      data={{
        title: {
          size: 'title2XLarge',
          children: 'Your Resume',
        },
      }}
    />
    <br />
    <div id="resume-content">
      <h2>{`${data.first_name} ${data.last_name}`}</h2>
      <p>{data.email}</p>
      <p>{data.phone}</p>
      <p>{data.location}</p>
      <p>{data.languages}</p>
      <h3>Education</h3>
      <p>{data.university}</p>
      <p>{data.university_location}</p>
      <p>{data.major}</p>
      <p>{data.gpa}</p>
      <p>{data.coursework}</p>
      <h3>Experience</h3>
      <p>{data.company1}</p>
      <p>{data.jobTitle1}</p>
      <p>{data.startDate1}</p>
      <p>{data.endDate1}</p>
      <p>{data.description1}</p>
      <h3>Projects</h3>
      <p>{data.projectTitle1}</p>
      <p>{data.projectDescription1}</p>
    </div>
  </div>
);

export default DisplayResume;
```

### Form.js

```jsx
import React, { Component } from 'react';
import { resumeBuild, formStyle, resumeSubmitButton } from '../styles/Components.css';
import { TitleLockup, Input, DropdownSelect, RadioButtonGroup, ButtonGroup, DatePicker } from '@vds/utilities';

class Form extends Component {
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

  handleSubmit = async (event) => {
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
    console.log(
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
    );

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

    return (
      <div id="resume-build" style={resumeBuild}>
        <TitleLockup
          id="resume-build-title"
          surface="light"
          textAlignment="center"
          data={{
            title: {
              size: 'title2XLarge',
              children: 'Resume Builder',
            },
          }}
        />
        <br />
        <form id="resume-build-form" style={formStyle} onSubmit={this.handleSubmit}>
          <Input
            id="first_name"
            label="First Name"
            onChange={this

.handleChange}
            value={first_name}
            required
          />
          <Input
            id="last_name"
            label="Last Name"
            onChange={this.handleChange}
            value={last_name}
            required
          />
          <Input
            id="phone"
            label="Phone"
            onChange={this.handleChange}
            value={phone}
            required
          />
          <Input
            id="email"
            label="Email"
            onChange={this.handleChange}
            value={email}
            required
          />
          <Input
            id="location"
            label="Location"
            onChange={this.handleChange}
            value={location}
            required
          />
          <Input
            id="languages"
            label="Languages"
            onChange={this.handleChange}
            value={languages}
            required
          />
          <Input
            id="university"
            label="University"
            onChange={this.handleChange}
            value={university}
            required
          />
          <Input
            id="university_location"
            label="University Location"
            onChange={this.handleChange}
            value={university_location}
            required
          />
          <Input
            id="major"
            label="Major"
            onChange={this.handleChange}
            value={major}
            required
          />
          <Input id="gpa" label="GPA" onChange={this.handleChange} value={gpa} required />
          <Input
            id="coursework"
            label="Coursework"
            onChange={this.handleChange}
            value={coursework}
            required
          />
          <Input
            id="company1"
            label="Company"
            onChange={this.handleChange}
            value={company1}
            required
          />
          <Input
            id="jobTitle1"
            label="Job Title"
            onChange={this.handleChange}
            value={jobTitle1}
            required
          />
          <DatePicker
            id="startDate1"
            label="Start Date"
            onChange={(date) => this.handleDateChange('startDate1', date)}
            value={startDate1}
            required
          />
          <DatePicker
            id="endDate1"
            label="End Date"
            onChange={(date) => this.handleDateChange('endDate1', date)}
            value={endDate1}
            required
          />
          <Input
            id="description1"
            label="Description"
            onChange={this.handleChange}
            value={description1}
            required
          />
          <Input
            id="projectTitle1"
            label="Project Title"
            onChange={this.handleChange}
            value={projectTitle1}
            required
          />
          <Input
            id="projectDescription1"
            label="Project Description"
            onChange={this.handleChange}
            value={projectDescription1}
            required
          />
          <ButtonGroup
            id="resume-submit"
            childWidth="100%"
            viewport="desktop"
            surface="light"
            rowQuantity={{ desktop: 1 }}
            alignment="center"
            data={[
              {
                children: 'Submit',
                size: 'large',
                use: 'primary',
                width: '250px',
                onClick: this.handleSubmit,
              },
            ]}
            style={resumeSubmitButton}
          />
        </form>
      </div>
    );
  }
}

export default Form;
```

### App.js

```jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigation } from '@vds/layouts';
import { NavTab } from '@vds/tab';
import { vdsStyles } from '@vds/core';
import ResumeBuild from './components/ResumeBuild';
import DisplayResume from './components/DisplayResume';
import Form from './components/Form';
import { container } from './styles/Components.css';

const App = () => {
  const [data, setData] = useState(null);

  const handleDataSubmit = (submittedData) => {
    setData(submittedData);
  };

  return (
    <Router>
      <div className={vdsStyles.container}>
        <Navigation surface="light">
          <NavTab>
            <Link to="/resume-build">Resume Build</Link>
          </NavTab>
          <NavTab>
            <Link to="/display-resume">Display Resume</Link>
          </NavTab>
          <NavTab>
            <Link to="/form">Form</Link>
          </NavTab>
        </Navigation>
        <div id="app-container" style={container}>
          <Routes>
            <Route path="/resume-build" element={<ResumeBuild onDataSubmit={handleDataSubmit} />} />
            <Route path="/display-resume" element={<DisplayResume data={data} />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
```

In this code, the `Form` component is a standalone component that is similar to the `ResumeBuild` component but has its own implementation. The `DisplayResume` component is updated to receive `data` as a prop from the `App` component and display the resume content. The `App` component manages the state of the submitted data and passes it to the `DisplayResume` component. The routing is set up to navigate between `ResumeBuild`, `DisplayResume`, and `Form` components.
