
<div id='display_resume'> 
          {error && <div style={{ color: 'red' }}>{error}</div>}

          {resumeData && (
            <div>
              <h3>Resume Data:</h3>
              <pre>{JSON.stringify(resumeData, null, 2)}</pre>
            </div>
          )}
        </div>


the following are in the JSON : first_name, last_name, phone, email, location, languages, university, university_location, major, gpa, coursework, company1,jobTitle1, startDate1, endDate1, description1, projectTitle1, projectDescription1

give me code to display resumeData with something like resumeData.phone, resumeData.coursework etc
