import logo from './logo.svg';
import './App.css';
import React, { Fragment, Component, useState, useEffect } from 'react';
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
  innerHeight:'1000px',
}

const resumeSubmitButton = {
  marginLeft:'0%'
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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
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
        this.setState({ userId });
        alert(`${message} User ID: ${userId}`);
      } else {
        alert('User Data save failed!');
      }
    } else {
      alert('Network error or failed to fetch');
    }
  };

  getResumeData = async () => {
    try {
      const { userId } = this.state; 
      const response = await fetch(`api/v2/resume?user_id=${userId}`, {
        mode: 'no-cors',
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
  };

  render() {
    const { resumeData, error, first_name, last_name, phone, email, location, languages, university, university_location, major, gpa, coursework, company1,jobTitle1, startDate1, endDate1, description1, projectTitle1, projectDescription1 } = this.state;

    return (
      <Fragment>
        <VDSManager/>

        <div id='heroSection' style={heroStyle}> 

          <TileContainer id='hero-header' 
          padding='0px' aspectRatio='16:9' width='100%' height='200px' backgroundColor="black" >
              
              <TitleLockup
                surface="dark"
                textAlignment='center'
                data={{
                  eyebrow: {
                    size: 'titleMedium',
                    children: 'Get Started ‎ ‎ ‎  Learn More ‎ ‎ ‎  About me ‎ ‎ ‎   Support',
                    bold: 'true',
                  },
                }}
              />

          </TileContainer>
          
          <TileContainer id='hero-title-section' 
            padding='0px'aspectRatio='16:9' width='100%'height='450px'backgroundColor="black">

              <div style={centerDivStyle}> 
              
                <TitleLockup id='hero-title'
                  surface="dark"
                  textAlignment='center'
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

                <ButtonGroup id='hero-buttons'
                  childWidth={'100%'}
                  viewport={'desktop'}
                  surface="dark"
                  rowQuantity={{ desktop: 2 }}
                  alignment={'center'}
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
                    },]}
                    />;

                <br />  <br />  <br />  <br />  <br />  <br />  <br /> <br /> <br /> <br /> 

              <div id='hero-down-caret' style={iconStyle}> <Icon name="down-caret" size="XLarge" color="#FFFFFF" /> </div>

              </div>

          </TileContainer>

        </div>

        <div id='section2' style={section2}> 


          <TitleLockup id='section2-title'
          surface="light"
          textAlignment='center'
          data={{
            
            title: {
              size: 'title2XLarge',
              children: 'Resume 4x features.',
            },
          }}
          />

          <br />  <br />  <br />  <br />  <br /> 

          <TileletCarousel id ='section2-carousel'
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
                    children: `ATS`,
                  },
                  subtitle: {
                    size: 'bodyLarge',
                    primitive: 'h1',
                    children:
                      'Resumes are optimized for ATS (Application Tracking System)',
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
                    children:
                      'Complementary personal website at resume2x.com/name',
                  },
                  backgroundColor: 'white',
                  showBorder:true,
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
                    children: `Resume built in less than 30 seconds`,
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

        <div id='resume-build' style = {resumeBuild}>

          <div id='header'> 
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
          </div>

          <form id="userDataForm" onSubmit={this.handleSubmit} style={formStyle}>

            <div id='user_data_section'> 
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
            </div>
              
            <div id='education_section'> 
            <Input 
              type="text" 
              width="50%"
              label="University"
              name="university"
              onChange={this.handleChange}
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid University.'
            /> <br /> <br /> 

            <Input 
              type="text" 
              width="50%"
              label="University location"
              name="university_location"
              onChange={this.handleChange}
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter valid university location.'
            /> <br /> <br /> 

            <Input 
              type="text" 
              width="50%"
              label="Major"
              name="major"
              onChange={this.handleChange}
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid major.'
            /> <br /> <br /> 

            <Input 
              type="text" 
              width="50%"
              label="GPA"
              name="gpa"
              onChange={this.handleChange}
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid GPA.'
            /> <br /> <br /> 

          <Input 
              type="text" 
              width="50%"
              label="coursework"
              name="coursework"
              onChange={this.handleChange}
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter valid coursework.'
            /> <br /> <br /> 
            </div>

            <div id='work_section'> 

            <RadioButtonGroup
                onChange={() => {}}
                error={false}
                data={[
                  {
                    name: 'group',
                    label: 'I have work experience',
                    children: 'You will be prompted to enter a maximum of 3 work experiences',
                    value: 'radioOne',
                    ariaLabel: 'radio one',
                    disabled: false
                  },
                  {
                    name: 'group',
                    label: 'I do not have work experience',
                    children: 'You will not be asked to enter any work experiences',
                    value: 'radioTwo',
                    ariaLabel: 'radio two',
                  }
                ]}
              /> <br /> <br /> 

                <Input 
                  type="text" 
                  width="50%"
                  label="Company 1"
                  name="company1"
                  value={this.state.company1}
                  onChange={this.handleChange}
                  required={true}
                />
                <br /><br />
                <Input 
                  type="text" 
                  width="50%"
                  label="Job Title 1"
                  name="jobTitle1"
                  value={this.state.jobTitle1}
                  onChange={this.handleChange}
                  required={true}
                />
                <br /><br />
                <DatePicker
                  dateFormat="MM/DD/YYYY"
                  width="70.75%"
                  label="Start Date 1"
                  name="startDate1"
                  selected={this.state.startDate1}
                  onChange={(date) => this.handleDateChange('startDate1', date)}
                />
                <br /><br />
                <DatePicker
                  dateFormat="MM/DD/YYYY"
                  width="70.75%"
                  label="End Date 1"
                  name="endDate1"
                  selected={this.state.endDate1}
                  onChange={(date) => this.handleDateChange('endDate1', date)}
                />
                <br /><br />
                <Input 
                  type="text" 
                  width="50%"
                  label="Description 1"
                  name="description1"
                  value={this.state.description1}
                  onChange={this.handleChange}
                  required={true}
                />
                <br /><br />
                

            </div>
          
            <div id='project_section'> 
              <RadioButtonGroup
                  onChange={() => {}}
                  error={false}
                  data={[
                    {
                      name: 'group',
                      label: 'I have project experience',
                      children: 'You will be prompted to enter a maximum of 3 project experiences',
                      value: 'radioOne',
                      ariaLabel: 'radio one',
                      disabled: false
                    },
                    {
                      name: 'group',
                      label: 'I do not have project experience',
                      children: 'You will not be asked to enter any project experiences',
                      value: 'radioTwo',
                      ariaLabel: 'radio two',
                    }
                  ]}
                /> <br /> <br /> 

              <Input 
                  type="text" 
                  width="50%"
                  label="Project Title 1"
                  name="projectTitle1"
                  value={this.state.projectTitle1}
                  onChange={this.handleChange}
                  required={true}
                />
                <br /><br />
                <Input 
                  type="text" 
                  width="50%"
                  label="Project Description 1"
                  name="projectDescription1"
                  value={this.state.projectDescription1}
                  onChange={this.handleChange}
                  required={true}
                />
                <br /><br />

            </div>

            <button type="submit">Save Data To PSQL</button>

          </form>

          <div style={resumeSubmitButton}> 
              <br /><br /><br /><br /><br />
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
                    onClick: this.getResumeData
                  },
                  {
                    children: 'Cancel',
                    size: 'large',
                    use: 'textLink',
                    width: 'auto'
                  }
                ]}
                alignment="center"
              />
              <br /><br /><br /><br /><br />
          </div>

        </div>

        <div id='display_resume'> 
          {error && <div style={{ color: 'red' }}>{error}</div>}

          {/* {resumeData && (
            <div>
              <h3>Resume Data:</h3>
              <pre>{JSON.stringify(resumeData, null, 2)}</pre>

              {resumeData.user_data.length > 0 && (
                <div id='display_resume_1' style={display_resume_1_style}> 
                  <div id='display_resume_1_text_area' style={display_resume_1_text_area_style}> 
                    <br /><br /><br /><br /><br /><br />

                    <TitleLockup
                      id='hero-title'
                      surface="dark"
                      data={{
                        title: {
                          size: 'title2XLarge',
                          children: `${resumeData.user_data[0].first_name} ${resumeData.user_data[0].last_name}`,
                        },
                        subtitle: {
                          size: 'titleMedium',
                          children: `${resumeData.user_data[0].phone} ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ${resumeData.user_data[0].email} ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ${resumeData.user_data[0].location} ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ${resumeData.user_data[0].languages}`,
                        },
                      }}
                    />   
                    <br /> 

                    <TitleLockup
                      id='hero-title'
                      surface="dark"
                      data={{
                        eyebrow: {
                          size: 'title2XLarge',
                          children: 'Please click continue to view your resume powered by the fastest 5G in the world',
                        },
                      }}
                    />
                    <br /> <br />

                    <ButtonGroup
                      id='hero-buttons'
                      childWidth={'100%'}
                      viewport={'desktop'}
                      surface="dark"
                      rowQuantity={{ desktop: 2 }}
                      alignment={'left'}
                      data={[
                        {
                          children: 'Continue',
                          size: 'medium',
                          use: 'secondary',
                          width: '150px',
                          onClick: () => alert('You clicked the Button example!'),
                        },
                      ]}
                    />
                  </div>
                </div>
              )}
            </div>
          )} */}
          
        </div>
