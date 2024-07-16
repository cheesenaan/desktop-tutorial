
  handleBuildResumeClick = async () => {
    try {
      const response = await fetch('/resume?user_id=1', { mode: 'no-cors' });
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

render()

<div style={resumeSubmitButton}> 
            <br /><br /><br /><br /><br />
            <ButtonGroup
              childwidth="100%"
              viewport="desktop"
              rowQuantity={{ desktop: 2 }}
              data={[
                {
                  children: 'Get resume data (test)',
                  size: 'large',
                  use: 'primary',
                  width: 'auto',
                  onClick: this.handleBuildResumeClick
                },
                {
                  children: 'Cancel',
                  size: 'large',
                  use: 'textLink',
                  width: 'auto'
                }
              ]}
              alignment="center"
            />
            <br /><br /><br /><br /><br />
        </div>

