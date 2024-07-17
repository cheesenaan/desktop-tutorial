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





            above is not working
here is how the json looks like

{
  "user_data": [
    {
      "user_id": 21,
      "first_name": "sulemaan",
      "last_name": "farooq",
      "phone": "111111111",
      "email": "sule@gmail.com",
      "location": "California",
      "languages": "a"
    }
  ],
  "education": [
    {
      "education_id": 16,
      "university": "a",
      "major": "a",
      "gpa": 1.1,
      "coursework": "a",
      "location": "a",
      "user_id": 21
    }
  ],
  "work_experience": [
    {
      "work_experience_id": 9,
      "title": "a",
      "company": "a",
      "description": "a",
      "start_date": "2024-07-17T00:00:00.000Z",
      "end_date": "2024-07-19T00:00:00.000Z",
      "user_id": 21
    }
  ],
  "projects": [
    {
      "project_id": 9,
      "title": "a",
      "description": "a",
      "user_id": 21
    }
  ]
}
        />
      </div>
    </div>
  </div>
)}
