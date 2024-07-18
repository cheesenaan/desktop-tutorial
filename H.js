apps.js

export default class App extends Component {
render() {
  return (

      <Fragment> 

        <HeroSection />
        <Section2 />
        <ResumeSection />


      </Fragment>



  component/ResumeSection.js
  import React, { Component } from 'react';
import { VDSManager } from '@vds/utilities';
import { Title } from '@vds/typography';
import { Feature } from '@vds/typography';
import { ModalFooter, ModalFooterProps } from "@vds/modals";
import { Modal, ModalProps } from "@vds/modals";
import { Button, ButtonProps } from "@vds/buttons";
import { ModalTitle, ModalTitleProps } from "@vds/modals";
import { ModalBody, ModalBodyProps } from "@vds/buttons";
import { TileContainer, TileContainerProps } from "@vds/tiles";
import { TitleLockup, TitleLockupProps } from "@vds/type-lockups";
import { Carousel, CarouselProps } from "@vds/carousels";
import { TileletCarousel, TileletCarouselProps } from "@vds/tiles";
import { Input, TextArea, TextAreaProps } from "@vds/inputs";
import "@vds/inputs";
import { RadioButtonGroup, RadioButtonGroupProps } from "@vds/radio-buttons";
import { DatePicker, DatePickerProps } from "@vds/date-pickers";
import { DropdownSelect, DropdownSelectProps } from "@vds/selects";
import { ButtonGroup, ButtonGroupProps } from "@vds/buttons";
import { Icon, IconProps } from "@vds/icons";


const centerDivStyle = {
  justifyContent:'center',
  alignItems:'center',
  marginLeft:'30%',
};

const heroStyle = {
  backgroundColor:'black',
}

const iconStyle = {
  marginLeft:'50%',
}

const section2 = {
  marginTop : '120px',
}

const resumeBuild = {
  backgroundColor : '#F6F6F6',
  marginTop : '120px',
}

const formStyle = {
  marginLeft:'33%',
}

const resumeSubmitButton = {
  marginLeft:'-48%'
}

const display_resume_1_style = {
  backgroundColor:'black',
  height:'900px' ,
}

const display_resume_1_text_area_style = {
  marginLeft:'130px',
  backgroundColor:'black',
}

const display_resume_2_style = {
  height:'900px' ,
}

const display_resume_2_text_area_style = {
  marginLeft:'130px',
}

const display_resume_3_style = {
  backgroundColor:'#F6F6F6',
  height:'900px' ,
}

const display_resume_3_text_area_style = {
  marginLeft:'130px',
}

class ResumeSection extends Component {
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
        <br />  <br /> <br />

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
         <br /> <br /> <br />
        <form id="resume-build-form" style={formStyle} onSubmit={this.saveUserData}>
          <Input
            id="first_name"
            width="50%"
            label="First Name"
            onChange={this.handleChange}
            value={first_name}
            required
          /> <br />
          <Input
            id="last_name"
            label="Last Name"
            onChange={this.handleChange}
            width="50%"
            value={last_name}
            required
          /> <br />
          <Input
            id="phone"
            label="Phone"
            onChange={this.handleChange}
            width="50%"
            value={phone}
            required
          /> <br />
          <Input
            id="email"
            label="Email"
            onChange={this.handleChange}
            width="50%"
            value={email}
            required
          /> <br />
          <Input
            id="location"
            label="Location"
            onChange={this.handleChange}
            width="50%"
            value={location}
            required
          /> <br />
          <Input
            id="languages"
            label="Languages"
            onChange={this.handleChange}
            width="50%"
            value={languages}
            required
          /> <br />
          <Input
            id="university"
            label="University"
            onChange={this.handleChange}
            width="50%"
            value={university}
            required
          /> <br />
          <Input
            id="university_location"
            label="University Location"
            onChange={this.handleChange}
            width="50%"
            value={university_location}
            required
          /> <br />
          <Input
            id="major"
            label="Major"
            onChange={this.handleChange}
            width="50%"
            value={major}
            required
          /> <br />
          <Input id="gpa" width="50%" label="GPA" onChange={this.handleChange} value={gpa} required />
          <Input
            id="coursework"
            label="Coursework"
            onChange={this.handleChange}
            width="50%"
            value={coursework}
            required
          /> <br />
          <Input
            id="company1"
            label="Company"
            onChange={this.handleChange}
            width="50%"
            value={company1}
            required
          /> <br />
          <Input
            id="jobTitle1"
            label="Job Title"
            onChange={this.handleChange}
            width="50%"
            value={jobTitle1}
            required
          /> <br />
          <DatePicker
            id="startDate1"
            label="Start Date"
            onChange={(date) => this.handleDateChange('startDate1', date)}
            width="70.7%"
            value={startDate1}
            required
          /> <br />
          <DatePicker
            id="endDate1"
            label="End Date"
            onChange={(date) => this.handleDateChange('endDate1', date)}
            width="70.7%"
            value={endDate1}
            required
          /> <br />
          <Input
            id="description1"
            label="Description"
            onChange={this.handleChange}
            width="50%"
            value={description1}
            required
          /> <br />
          <Input
            id="projectTitle1"
            label="Project Title"
            onChange={this.handleChange}
            width="50%"
            value={projectTitle1}
            required
          /> <br />
          <Input
            id="projectDescription1"
            label="Project Description"
            onChange={this.handleChange}
            width="50%"
            value={projectDescription1}
            required
          /> <br />

          <div style={resumeSubmitButton}> 
              <ButtonGroup
                id="resume-submit"
                childWidth="100%"
                viewport="desktop"
                surface="light"
                rowQuantity={{ desktop: 2 }}
                alignment="center"
                data={[
                  {
                    children: 'Save',
                    size: 'large',
                    use: 'primary',
                    width: '100px',
                    onClick: this.saveUserData,
                  },
                  {
                    children: 'Cancel',
                    size: 'large',
                    use: 'textLink',
                    width: '100px',
                    onClick: () => alert('You clicked the cancel button!'),
                  }
                ]}
              />
          </div>
          <br />  <br />  <br />

        </form>
      </div>
    );
  }
}

export default ResumeSection;



on my app no text goes inside the box
