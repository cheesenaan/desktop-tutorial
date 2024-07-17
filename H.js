{resumeData && (
  <div>
    <h3>Resume Data:</h3>
    <pre>{JSON.stringify(resumeData, null, 2)}</pre>

    <div id='display_resume_1' style={display_resume_1_style}> 
      <div id='display_resume_1_text_area' style={display_resume_1_text_area_style}> 
        <br /><br /><br /><br /><br /><br />

        <TitleLockup
          id='hero-title'
          surface="dark"
          data={{
            title: {
              size: 'title2XLarge',
              children: `${resumeData.first_name} ${resumeData.last_name}`,
            },
            subtitle: {
              size: 'titleMedium',
              children: `${resumeData.phone} ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ${resumeData.email} ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ${resumeData.location} ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ${resumeData.languages}`,
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
  </div>
)}
