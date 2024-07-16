apps.js

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
      university: '',
      university_location: '',
      major: '',
      gpa: '',
      coursework: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { first_name, last_name, phone, email, location, languages, university, university_location, major, gpa, coursework } = this.state;
    console.log(first_name, last_name, phone, email, location, languages, university, university_location, major, gpa, coursework);

    const response = await fetch('api/v2/saveUserData', {
      mode : 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name, last_name, phone, email, location, languages, university, university_location, major, gpa, coursework }),
    });

    if (response.ok) {
      alert('User Data saved successfully!');
    } else {
      alert('User Data save failed !');
    }


      <form id="userDataForm" onSubmit={this.handleSubmit} style={formStyle}>
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
          {/* <button type="submit">Submit</button>
              </form> */}
            
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
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />


            <Input 
              type="text" 
              width="50%"
              label="Job Title 1"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />

          <DatePicker
            dateFormat="MM/DD/YYYY"
            width="70.75%"
            alwaysOpen={false}
            readOnly={false}
            disabled={false}
            surface="light"
            minDate={new Date(1998, 1, 1)}
            label="Start Date 1"
            helperText="Choose the correct date for your appointment"
            helperTextPlacement="bottom"
          /> <br /> <br /> 

          <DatePicker
            dateFormat="MM/DD/YYYY"
            width="70.75%"
            alwaysOpen={false}
            readOnly={false}
            disabled={false}
            surface="light"
            minDate={new Date(1998, 1, 1)}
            label="End Date 1"
            helperText="Choose the correct date for your appointment"
            helperTextPlacement="bottom"
          /> <br /> <br /> 

            <Input 
              type="text" 
              width="50%"
              label="Description 1"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />

          <Input 
              type="text" 
              width="50%"
              label="Company 2"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />


            <Input 
              type="text" 
              width="50%"
              label="Job Title 2"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />

            <Input 
              type="date" 
              label="Start Date 2"
              width="50%"
              readOnly={false}
              required={false}
              disabled={false}
              error={false}
              errorText='Enter a valid date.'
              helperText='For example: 123 Verizon St'
              helperTextPlacement="bottom"
              tooltipTitle='Check the formatting of your address'
              tooltipContent="House/Building number then street name" /> <br /> <br /> 

            <Input 
              type="date" 
              label="End Date 2"
              width="50%"
              readOnly={false}
              required={false}
              disabled={false}
              error={false}/> <br /> <br /> 

            <Input 
              type="text" 
              width="50%"
              label="Description 2"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />

          <Input 
              type="text" 
              width="50%"
              label="Company 3"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />


            <Input 
              type="text" 
              width="50%"
              label="Job Title 3"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />

            <Input 
              type="date" 
              label="Start Date 3"
              width="50%"
              readOnly={false}
              required={false}
              disabled={false}
              error={false}
              errorText='Enter a valid date.'
              helperText='For example: 123 Verizon St'
              helperTextPlacement="bottom"
              tooltipTitle='Check the formatting of your address'
              tooltipContent="House/Building number then street name" /> <br /> <br /> 

            <Input 
              type="date" 
              label="End Date 3"
              width="50%"
              readOnly={false}
              required={false}
              disabled={false}
              error={false}/> <br /> <br /> 

            <Input 
              type="text" 
              width="50%"
              label="Description 3"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />

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
              label="Project title 1"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />

          <Input 
              type="text" 
              width="50%"
              label="Project description 1"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />

        <Input 
              type="text" 
              width="50%"
              label="Project title 2"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />

          <Input 
              type="text" 
              width="50%"
              label="Project description 2"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />

        <Input 
              type="text" 
              width="50%"
              label="Project title 3"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />

          <Input 
              type="text" 
              width="50%"
              label="Project description 3"
              readOnly={false}
              required={true}
              disabled={false}
              error={false}
              errorText='Enter a valid name.'
            /> <br /> <br />


                <button type="submit">Submit</button>

          </form>



node js backedn

api.post('/api/v2/saveUserData', async (req, res) => {
    console.log("inside index ");
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
        coursework
    } = req.body;


    // Validate input fields if needed

    const resumeDataDAO = new ResumeDataDAO();

    try {
        // Insert into user_data table
        const userId = await resumeDataDAO.sendUserData(first_name, last_name, phone, email, location, languages);

        // Insert into education table
        await resumeDataDAO.sendEducationData(userId, university, university_location, major, gpa, coursework);

        res.status(200).send("Data saved successfully");
    } catch (error) {
        console.error('Error saving user data:', error.message);
        res.status(500).send('Failed to save data');
    }
});




    async sendUserData(first_name, last_name, phone, email, location, languages) {
        try {
            const query = 'INSERT INTO user_data (first_name, last_name, phone, email, location, languages) VALUES (?, ?, ?, ?, ?, ?) RETURNING user_id';
            const values = [first_name, last_name, phone, email, location, languages];

            // Execute the query to insert into user_data and retrieve user_id
            const result = await this.db.raw(query, values);
            return result.rows[0].user_id;
        } catch (err) {
            console.error('Failed to save user data:', err.stack);
            throw err;
        }
    }

    async sendEducationData(userId, university, university_location, major, gpa, coursework) {
        try {
            const query = 'INSERT INTO education (university, location, major, gpa, coursework, user_id) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [university, university_location, major, gpa, coursework, userId];

            // Execute the query to insert into education
            await this.db.raw(query, values);
            return true; // Optional: Return a success indicator if needed
        } catch (err) {
            console.error('Failed to save education data:', err.stack);
            throw err;
        }
    }
