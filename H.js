import { TitleLockup } from "@vds/type-lockups";
import { Input } from "@vds/inputs";
import "@vds/inputs";
import { RadioButtonGroup } from "@vds/radio-buttons";
import { DatePicker, DatePickerProps } from "@vds/date-pickers"
import { ButtonGroup } from "@vds/buttons";
import 'styled-components';
import styled from "styled-components";
import React, { useState } from 'react';
import axios from 'axios';


const StyledResumeBuild = styled.div`
  background-color: #f6f6f6;
  margin-top: 4rem;
`;

const SyledForm = styled.div`
  margin-left: 33%;
`;

const StyledResumeHeader = styled.div`
  margin-top: 2rem; 
  margin-bottom: 4rem; 
`;

const StyledInput = styled.div`
  margin-top: 1.3rem; // Adjust margin value as needed
  margin-bottom: 1.3rem; // Adjust margin value as needed
`;

const StyledResumeButton = styled.div`
  margin-left: -48%;
`;

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

  const handleDateChange = (newValue, name) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: newValue,
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

    console.log("formData is : ", formData)

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
  
  return (
    <StyledResumeBuild>
      <br />

      <StyledResumeHeader>
        <TitleLockup
          id="resume-build-title"
          surface="light"
          textAlignment="center"
          data={{
            title: {
              size: 'title2XLarge',
              children: (
                <>
                  Resume <span style={{ color: 'red' }}> Builder.</span>
                </>
              ),
            },
          }}
        />
      </StyledResumeHeader>

      <SyledForm>
        <form id="resume-build-form" onSubmit={saveUserData}>
          <StyledInput>
            <Input
              id="first_name"
              width="50%"
              label="First Name"
              name="first_name"
              onChange={handleChange}
              value={first_name}
              required
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="last_name"
              label="Last Name"
              name="last_name"
              onChange={handleChange}
              width="50%"
              value={last_name}
              required
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="phone"
              label="Phone"
              name="phone"
              onChange={handleChange}
              width="50%"
              value={phone}
              required
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="email"
              label="Email"
              name="email"
              onChange={handleChange}
              width="50%"
              value={email}
              required
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="location"
              label="Location"
              name="location"
              onChange={handleChange}
              width="50%"
              value={location}
              required
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="languages"
              label="Languages"
              name="languages"
              onChange={handleChange}
              width="50%"
              value={languages}
              required
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="university"
              label="University"
              name="university"
              onChange={handleChange}
              width="50%"
              value={university}
              required
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="university_location"
              label="University Location"
              name="university_location"
              onChange={handleChange}
              width="50%"
              value={university_location}
              required
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="major"
              label="Major"
              name="major"
              onChange={handleChange}
              width="50%"
              value={major}
              required
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="gpa"
              label="GPA"
              name="gpa"
              width="50%"
              onChange={handleChange}
              value={gpa}
              required
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="coursework"
              label="Coursework"
              name="coursework"
              onChange={handleChange}
              width="50%"
              value={coursework}
              required
            />
          </StyledInput>

          <StyledInput>
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
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="company1"
              label="Company"
              name="company1"
              onChange={handleChange}
              width="50%"
              value={company1}
              required
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="jobTitle1"
              label="Job Title"
              name="jobTitle1"
              onChange={handleChange}
              width="50%"
              value={jobTitle1}
              required
            />
          </StyledInput>

          <StyledInput>
          <DatePicker
            id="startDate1"
            label="Start Date"
            dateFormat="MM/DD/YYYY"
            onChange={handleChange}
            alwaysOpen={false}
            readOnly={false}
            disabled={false}
            surface="light"
            minDate={new Date(1998, 1, 1)}
            label="Date"
            helperText="Enter your start date"
            helperTextPlacement="bottom"
            width="70.7%"
          />
          </StyledInput>

          <StyledInput>
          <DatePicker
            id="endDate1"
            label="End Date"
            dateFormat="MM/DD/YYYY"
            onChange={handleChange}
            alwaysOpen={false}
            readOnly={false}
            disabled={false}
            surface="light"
            minDate={new Date(1998, 1, 1)}
            label="Date"
            helperText="Enter your end date"
            helperTextPlacement="bottom"
            width="70.7%"
          />
          </StyledInput>

          <StyledInput>
            <Input
              id="description1"
              label="Description"
              name="description1"
              onChange={handleChange}
              width="50%"
              value={description1}
              required
            />
          </StyledInput>

          <StyledInput>
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
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="projectTitle1"
              label="Project Title"
              name="projectTitle1"
              onChange={handleChange}
              width="50%"
              value={projectTitle1}
              required
            />
          </StyledInput>

          <StyledInput>
            <Input
              id="projectDescription1"
              label="Project Description"
              name="projectDescription1"
              onChange={handleChange}
              width="50%"
              value={projectDescription1}
              required
            />
          </StyledInput>

          <StyledResumeButton>
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
                  onClick: handleSaveUserData,
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
          </StyledResumeButton>
          <br /> <br />
        </form>
      </SyledForm>
    </StyledResumeBuild>
  );
};

export default ResumeSection;
