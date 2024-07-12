react apps.js
      <div style={resumeSubmitButton}>
        <br /><br /><br /><br /><br />
        <ButtonGroup
          childWidth={'100%'}
          viewport={'desktop'}
          rowQuantity={{ desktop: 2 }}
          data={[
            {
              children: 'Build resume',
              size: 'large',
              use: 'primary',
              width: 'auto',
              onClick: handleBuildResumeClick
            },
            {
              children: 'Cancel',
              size: 'large',
              use: 'textLink',
              width: 'auto',
              onClick: () => alert('You clicked the Cancel button!')
            }
          ]}
          alignment={'center'}
        />
        <br /><br /><br /><br /><br />
      </div>


node js backend index.js file api
api.get('/resume', async (req, res) => {
    try {
        const { user_id } = req.query; // Get user_id from query parameters
        if (!user_id) {
            return res.status(400).json({ error: 'user_id is required' });
        }

        const resumeDataDAO = new ResumeDataDAO();
        const data = await resumeDataDAO.getResumeData(user_id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


when Build resume is clicked , i want to get the resume data using the /resume api with user_id = 1 
