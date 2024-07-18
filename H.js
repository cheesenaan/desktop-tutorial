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
    console.log("this.props.userId id is ", this.props.userId);

    if(!this.props.userId) {
      alert("user id is undefined !");
      return;
    }


    try {
      const response = await fetch(`api/v2/resume?user_id=${this.props.userId}`, {
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
                  onClick: this.getResumeData
                },
                {
                  children: 'Cancel',
                  size: 'large',
                  use: 'textLink',
                  width: 'auto'
                }
              ]}
              alignment="center"/>
            <br /><br /><br /><br /><br />
        </div>


          {error && <div style={{ color: 'red' }}>{error}</div>}

          {resumeData && (
            <div>
              <h3>Resume Data:</h3>
              <pre>{JSON.stringify(resumeData, null, 2)}</pre>
            </div>
          )}
        

    );
  }
}

export default DisplayResume;
