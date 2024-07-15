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
      location: '',
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
      alert('Failed to save data error from react apps.js file.');
    }
  };


...


<form id="form" style={{ form: {} }} onSubmit={this.handleSubmit}>
              <div id='form' style = {formStyle}>

    <Input 
        type="text" 
        label="First name"
        name='first_name'
        value={this.state.first_name}
        onChange={this.handleChange}
        width="50%"
        readOnly={false}
        required={true}
        disabled={false}
        error={false}
        errorText='Enter a valid name.'
        /> <br /> <br /> 

      <Input 
        type="text" 
        width="50%"
        label="Last name"
        name='last_name'
        value={this.state.last_name}
        onChange={this.handleChange}
        readOnly={false}
        required={true}
        disabled={false}
        error={false}
        errorText='Enter a valid name.'
        /> <br /> <br />

       <Input 
        type="tel" 
        width="50%"
        label="Phone number"
        name='phone'
        value={this.state.phone}
        onChange={this.handleChange}
        readOnly={false}
        required={true}
        disabled={false}
        error={false}
        errorText='Enter a valid phone number.'
        defaultValue={'1234567890'}
      /> <br /> <br /> 

        <Input 
        type="email" 
        label="Email"
        name='email'
        width="50%"
        value={this.state.email}
        onChange={this.handleChange}
        readOnly={false}
        required={true}
        disabled={false}
        error={false}
        errorText='Enter a valid email.'
        /> <br /> <br /> 

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


      <Input 
        type="text" 
        width="50%"
        label="Languages"
        name='languages'
        value={this.state.languages}
        onChange={this.handleChange}
        readOnly={false}
        required={true}
        disabled={false}
        error={false}
        errorText='Enter a valid name.'
        /> <br /> <br />

            <button type="submit">Submit</button>

</div>
              </form>
        </div>

