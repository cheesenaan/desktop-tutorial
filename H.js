  getResumeData = async () => {
    try {
      const { userId } = this.state; 
      if (userId == null) {
        
      }
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
