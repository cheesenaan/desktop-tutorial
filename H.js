app.js

import DisplayResume from "./components/DisplayResume.js";


<DisplayResume
          userId={this.userId}
        />


components/DisplayResume.js
getResumeData = async () => {
  try {
    const { userId } = this.state; 
    if (userId == null) {
      alert("please fill in the form first !");
      return;
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

const DisplayResume= () => (

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
        alignment="center"
      />
      <br /><br /><br /><br /><br />



    <div id='display_resume'> 
    {error && <div style={{ color: 'red' }}>{error}</div>}

    {resumeData && (
    <div>
      <h3>Resume Data:</h3>
      <pre>{JSON.stringify(resumeData, null, 2)}</pre>

      {resumeData.user_data.length > 0 && (
          <div id='display_resume_1' style={display_resume_1_style}> 
            <div id='display_resume_1_text_area' style={display_resume_1_text_area_style}> 
              <br /><br /><br /><br /><br /><br />

              <TitleLockup
                id='hero-title'
                surface="dark"
                data={{
                  title: {
                    size: 'title2XLarge',
                    children: `${resumeData.user_data[0].first_name} ${resumeData.user_data[0].last_name}`,
                  },
                  subtitle: {
                    size: 'titleMedium',
                    children: `${resumeData.user_data[0].phone} ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ${resumeData.user_data[0].email} ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ${resumeData.user_data[0].location} ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ${resumeData.user_data[0].languages}`,
                  },
                }}
              />   
              <br /> 

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
              <br /> <br />

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
            </div>
          </div>



fix the code
