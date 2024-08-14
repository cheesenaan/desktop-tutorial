import React from 'react';
import { Input, RadioButtonGroup, DatePicker, ButtonGroup, Loader } from 'your-component-library'; // Adjust imports based on your component library
import StyledResumeBuild from './StyledResumeBuild'; // Adjust paths as necessary
import StyledResumeHeader from './StyledResumeHeader';
import SyledForm from './SyledForm';
import StyledInput from './StyledInput';
import StyledResumeButton from './StyledResumeButton';
import TitleLockup from './TitleLockup'; // Adjust import based on your component library

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
  handleChange,
  handleDateChange,
  saveUserData 
}) => {

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
              onChange={(date) => handleDateChange('startDate1', date)}
              width="70.7%"
              value={startDate1}
              required
            />
          </StyledInput>

          <StyledInput>
            <DatePicker
              id="endDate1"
              label="End Date"
              onChange={(date) => handleDateChange('endDate1', date)}
              width="70.7%"
              value={endDate1}
              required
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
                  onClick: saveUserData,
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
