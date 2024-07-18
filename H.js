import React, { Component } from 'react';

class DisplayResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      resumeData: null,
      error: null,
    };
  }

  getResumeData = async () => {
    const { userId } = this.state;

    try {
      const response = await fetch(`api/v2/resume?user_id=${userId}`, {
        mode: 'no-cors', // Adjust as per your CORS setup
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
    const { resumeData, error } = this.state;

    return (
      <div>
        <button onClick={this.getResumeData}>Get Resume Data</button>
        {error && <p>{error}</p>}
        {resumeData && (
          <div>
            {/* Display resume data here */}
            <p>User ID: {resumeData.userId}</p>
            <p>Name: {resumeData.name}</p>
            {/* Example fields; replace with actual resume data structure */}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayResume;
