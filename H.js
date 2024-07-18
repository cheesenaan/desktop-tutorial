import React, { useState } from 'react';
import ButtonGroup from './ButtonGroup'; // Assuming ButtonGroup component is imported
import TitleLockup from './TitleLockup'; // Assuming TitleLockup component is imported

const DisplayResume = ({ userId, state }) => {
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);

  const getResumeData = async () => {
    try {
      if (!userId) {
        alert("Please fill in the form first!");
        return;
      }
      
      const response = await fetch(`api/v2/resume?user_id=${userId}`, {
        mode: 'cors', // Changed to 'cors' for proper CORS handling
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResumeData(data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch resume data:', error);
      setError('Failed to fetch resume data. Please try again later.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
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
            onClick: getResumeData // Use getResumeData directly
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

      {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}

      {resumeData && (
        <div id='display_resume'>
          <h3>Resume Data:</h3>
          <pre>{JSON.stringify(resumeData, null, 2)}</pre>

          {resumeData.user_data.length > 0 && (
            <div id='display_resume_1'>
              <div id='display_resume_1_text_area'>
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
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayResume;
