index.js in node js backend

api.post('/saveUserData', async (req, res) => {
    console.log("inside index ");
    const {first_name, last_name, phone, email, location, languages } = req.body;

    // Validate input fields if needed

    const resumeDataDAO = new ResumeDataDAO();

    try {
        await resumeDataDAO.sendUserData(first_name, last_name, phone, email, location, languages);
        res.status(200).send("Data saved successfully");
    } catch (error) {
        console.error('Error saving user data:', error.message);
        res.status(500).send('Failed to save data');
    }
});


apps.js in react front end

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
    console.log( "after const thing " , first_name, last_name, phone, email, location, languages);
    console.log(JSON.stringify({ first_name, last_name, phone, email, location, languages }));

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
      alert('Failed to save data in react apps.js');
    }
  };


  handleBuildResumeClick = async () => {
    try {
      const response = await fetch('/hello', { mode: 'no-cors' });
      console.log('response is :', response);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      // const data = await response.json();
      const data = document.getElementById('form').value;
      console.log('Resume data:', data);
      this.setState({ resumeData: data, error: null });
    } catch (error) {
      console.error('Failed to fetch resume data:', error);
      this.setState({ error: 'Failed to fetch resume data. Please try again later.' });
    }
  };

  render() {
    const { resumeData, error } = this.state;


       <div id='resume-build' style = {resumeBuild}>

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

              <div>
        <form id="userDataForm" onSubmit={this.handleSubmit}>
          <Input
            type="text"
            label="First name"
            name="first_name"
            value={this.state.first_name}
            onChange={this.handleChange}
            width="50%"
            required={true}
          />
          <br /><br />

          <Input
            type="text"
            label="Last name"
            name="last_name"
            value={this.state.last_name}
            onChange={this.handleChange}
            width="50%"
            required={true}
          />
          <br /><br />

          <Input
            type="tel"
            label="Phone number"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            width="50%"
            required={true}
          />
          <br /><br />

          <Input
            type="email"
            label="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            width="50%"
            required={true}
          />
          <br /><br />

          <DropdownSelect 
        label="Location"
        width="50%"
        errorText='Select a state'
        error={false}
        disabled={false}
        readOnly={false}
        inlineLabel={false}
        >
            <option></option>
            <option>Alabama</option>
            <option>Alaska</option>
            <option>Arizona</option>
            <option>Arkansas</option>
            <option>California</option>
            <option>Colorado</option>
            <option>Connecticut</option>
            <option>Delaware</option>
            <option>District Of Columbia</option>
            <option>Florida</option>
            <option>Georgia</option>
            <option>Hawaii</option>
            <option>Idaho</option>
            <option>Illinois</option>
            <option>Indiana</option>
            <option>Iowa</option>
            <option>Kansas</option>
            <option>Kentucky</option>
            <option>Louisiana</option>
            <option>Maine</option>
            <option>Maryland</option>
            <option>Massachusetts</option>
            <option>Michigan</option>
            <option>Minnesota</option>
            <option>Mississippi</option>
            <option>Missouri</option>
            <option>Montana</option>
            <option>Nebraska</option>
            <option>Nevada</option>
            <option>New Hampshire</option>
            <option>New Jersey</option>
            <option>New Mexico</option>
            <option>New York</option>
            <option>North Carolina</option>
            <option>North Dakota</option>
            <option>Ohio</option>
            <option>Oklahoma</option>
            <option>Oregon</option>
            <option>Pennsylvania</option>
            <option>Rhode Island</option>
            <option>South Carolina</option>
            <option>South Dakota</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Utah</option>
            <option>Vermont</option>
            <option>Virginia</option>
            <option>Washington</option>
            <option>West Virginia</option>
            <option>Wisconsin</option>
            <option>Wyoming</option>
        </DropdownSelect> <br /> <br /> 
          <br /><br />

          <Input
            type="text"
            label="Languages"
            name="languages"
            value={this.state.languages}
            onChange={this.handleChange}
            width="50%"
            required={true}
          />
          <br /><br />

          <button type="submit">Submit</button>
        </form>
