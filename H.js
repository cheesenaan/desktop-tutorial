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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  
  handleDateChange = (name, date) => {
    this.setState({ [name]: date });
  };

  return (
    <StyledResumeBuild>
      <br />
