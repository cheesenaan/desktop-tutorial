
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
      <div style={{ padding: '50px' }}>
        <div style={{ marginBottom: '20px' }}>
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
                onClick: this.getResumeData,
              },
              {
                children: 'Cancel',
                size: 'large',
                use: 'textLink',
                width: 'auto',
              },
            ]}
            alignment="center"
          />
        </div>

        
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {resumeData && (
          
          <div id='display_resume_1' style={{ display_resume_1_style }}>
            <div id='display_resume_1_text_area'>
              <pre>{JSON.stringify(resumeData, null, 2)}
              <TitleLockup
                id='hero-title'
                surface="dark"
                data={{
                  title: {
                    size: 'title2XLarge',
                    children: `${resumeData.user_data[0]} ${resumeData.user_data[0].last_name}`,
                  },
                  subtitle: {
                    size: 'titleMedium',
                    children: `${resumeData.user_data[0].phone} ${resumeData.user_data[0].email} ${resumeData.user_data[0].location} ${resumeData.user_data[0].languages}`,
                  },
                }}
              />

              <TitleLockup
                id='hero-title'
                surface="dark"
                data={{
                  eyebrow: {
                    size: 'title2XLarge',
                    children: 'Please click continue to view your resume powered by the fastest 5G in the world',
                  },
                }}
              />

              <ButtonGroup
                id='hero-buttons'
                childWidth={'100%'}
                viewport={'desktop'}
                surface="dark"
                rowQuantity={{ desktop: 2 }}
                alignment={'left'}
                data={[
                  {
                    children: 'Continue',
                    size: 'medium',
                    use: 'secondary',
                    width: '150px',
                    onClick: () => alert('You clicked the Button example!'),
                  },
                ]}
              />
              </pre>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DisplayResume;
