To use the `userId` obtained from the `handleSubmit` method in your `getResumeData` method in React, you can modify the `getResumeData` function to accept a `userId` parameter and use it in the fetch URL. Here’s how you can do it:

```javascript
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
      userId: null, // Added userId state
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
        alert(`${message} User ID: ${userId}`);
        this.setState({ userId }); // Update userId state
        // Optionally, update state or perform other actions with userId
        // this.setState({ userId });
      } else {
        alert('User Data save failed!');
      }
    } else {
      alert('Network error or failed to fetch');
    }
  };

  getResumeData = async () => {
    const { userId } = this.state; // Get userId from state
    try {
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
    // Render your form and other components
    return (
      <div>
        {/* Your form and other components */}
        <form onSubmit={this.handleSubmit}>
          {/* Form inputs */}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
```

### Explanation:

1. **State Management**: Added `userId` to the component's state to store the user ID retrieved after successful data submission.

2. **handleSubmit**: Updated to set `userId` in state upon successful submission. This allows subsequent functions, like `getResumeData`, to access the `userId`.

3. **getResumeData**: Modified to use the `userId` state in the fetch URL (`api/v2/resume?user_id=${userId}`). This ensures that the request retrieves resume data specific to the user whose ID was obtained from the form submission.

4. **Rendering**: The render method includes a basic form structure (`<form onSubmit={this.handleSubmit}>`) for capturing user input and submitting data.

### Notes:

- Ensure that the `handleSubmit` method correctly updates the `userId` state upon successful submission. You may need to adjust state management based on your application’s requirements (e.g., resetting state after submission or handling errors).
  
- Handle potential network errors or failed fetch requests in both `handleSubmit` and `getResumeData` methods for robust error handling and user feedback.

- Adjust the `fetch` URLs (`'api/v2/saveUserData'` and `'api/v2/resume'`) to match your actual backend API endpoints.

By following these steps, you can effectively use the `userId` obtained from form submission (`handleSubmit`) to fetch and display resume data specific to that user in your React application.
