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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: date
    }));
  };
