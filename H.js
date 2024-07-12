To handle CORS (Cross-Origin Resource Sharing) when your frontend and backend are running on different ports, you need to set up your backend to allow requests from your frontend.

### Backend: `index.js`
Use the `cors` middleware to enable CORS on your backend. Here’s how you can do it:

1. Install the `cors` package if you haven't already:
   ```bash
   npm install cors
   ```

2. Import and use the `cors` middleware in your `index.js` file:

```js
const express = require('express');
const cors = require('cors');

const api = express();
const ResumeDataDAO = require('./path-to-your-resume-data-dao'); // Replace with the actual path

// Use the CORS middleware
api.use(cors({
  origin: 'http://localhost:3001', // Allow only your frontend to access the backend
  methods: ['GET', 'POST'] // Specify allowed methods
}));

api.get('/resume', async (req, res) => {
  try {
    const { user_id } = req.query; // Get user_id from query parameters
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    const resumeDataDAO = new ResumeDataDAO();
    const data = await resumeDataDAO.getResumeData(user_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
api.listen(3000, () => {
  console.log('Backend server is running on http://localhost:3000');
});
```

### Frontend: `apps.js`
Your frontend code remains the same:

```jsx
import React from 'react';
import ButtonGroup from 'your-button-group-component'; // Replace with the actual import
import resumeSubmitButton from 'your-style-file'; // Replace with your actual style file

const handleBuildResumeClick = async () => {
  try {
    const response = await fetch('http://localhost:3000/resume?user_id=1');
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Resume data:', data);
    // Handle the resume data (e.g., update state or display it on the page)
  } catch (error) {
    console.error('Failed to fetch resume data:', error);
    // Handle the error (e.g., show an error message)
  }
};

const MyComponent = () => (
  <div style={resumeSubmitButton}>
    <br /><br /><br /><br /><br />
    <ButtonGroup
      childWidth={'100%'}
      viewport={'desktop'}
      rowQuantity={{ desktop: 2 }}
      data={[
        {
          children: 'Build resume',
          size: 'large',
          use: 'primary',
          width: 'auto',
          onClick: handleBuildResumeClick
        },
        {
          children: 'Cancel',
          size: 'large',
          use: 'textLink',
          width: 'auto',
          onClick: () => alert('You clicked the Cancel button!')
        }
      ]}
      alignment={'center'}
    />
    <br /><br /><br /><br /><br />
  </div>
);

export default MyComponent;
```

### Summary
- The backend is configured to allow CORS requests from `http://localhost:3001`.
- The frontend sends a request to `http://localhost:3000/resume` with `user_id=1` when the "Build resume" button is clicked.

With this setup, your frontend running on port 3001 should be able to successfully communicate with your backend running on port 3000.
