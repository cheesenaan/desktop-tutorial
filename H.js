<DisplayResume
          userId={this.userId}
        />


give me code for DisplayResume componennt
DisplayResume componennt will have a button called "get resume data"
when clicked, the "get resume data" button will run the function get_resume_data(userId) with userId as a paramater
the function will return data
getResumeData = async () => { // userId as paramarer
    try {
      const { userId } = this.state; 
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

then there should be code to display the data and any error messages

