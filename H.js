To save the form data from your React app to a PostgreSQL database using your Node.js backend, follow these steps:

1. **Update React App to Send Form Data to Backend:**
   - Capture form data and send it to the backend using a POST request.

2. **Set Up Node.js Backend to Handle the Request:**
   - Create an endpoint to receive the form data.
   - Connect to the PostgreSQL database and insert the data into the `user_data` table.

3. **Connect Node.js to PostgreSQL:**
   - Use a library like `pg` to interact with PostgreSQL.

Here's a step-by-step guide:

### React: Capture and Send Form Data

First, update your React component to capture form data and send it to your backend:

```jsx
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streetAddress: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      // Add other form fields as needed
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { streetAddress, firstName, lastName, phoneNumber } = this.state;

    const response = await fetch('/api/saveUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ streetAddress, firstName, lastName, phoneNumber }),
    });

    if (response.ok) {
      alert('Data saved successfully!');
    } else {
      alert('Failed to save data.');
    }
  };

  render() {
    return (
      <form id="form" style={{ form: {} }} onSubmit={this.handleSubmit}>
        <TextArea
          label="Street Address"
          name="streetAddress"
          value={this.state.streetAddress}
          onChange={this.handleChange}
          required
          // Other props
        />
        <Input
          type="text"
          width="50%"
          label="First name"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
          required
          // Other props
        />
        <Input
          type="text"
          width="50%"
          label="Last name"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
          required
          // Other props
        />
        <Input
          type="tel"
          width="50%"
          label="Phone number"
          name="phoneNumber"
          value={this.state.phoneNumber}
          onChange={this.handleChange}
          required
          // Other props
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

### Node.js: Set Up Endpoint to Receive Form Data

Next, create an endpoint in your Node.js backend to handle the form submission:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();

app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

app.post('/api/saveUserData', async (req, res) => {
  const { streetAddress, firstName, lastName, phoneNumber } = req.body;
  
  try {
    const query = 'INSERT INTO user_data (street_address, first_name, last_name, phone_number) VALUES ($1, $2, $3, $4)';
    const values = [streetAddress, firstName, lastName, phoneNumber];
    await pool.query(query, values);
    res.status(200).send('Data saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to save data');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### PostgreSQL: `user_data` Table Schema

Ensure your PostgreSQL `user_data` table has the appropriate columns:

```sql
CREATE TABLE user_data (
  id SERIAL PRIMARY KEY,
  street_address VARCHAR(255),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone_number VARCHAR(15)
);
```

### Summary

1. **React:** Capture form data and send it to the backend.
2. **Node.js:** Set up an endpoint to receive data and insert it into PostgreSQL.
3. **PostgreSQL:** Ensure your table schema matches the data you want to store.

With this setup, when the user submits the form, the data will be sent to your backend, which will then save it to your PostgreSQL database.
