app.post('/api/saveUserData', async (req, res) => {
    console.log("inside in api in index.js")
    const { first_name, last_name, phone, email, location, languages } = req.body;
    console.log("inside 2 in api in index.js")
    const resumeDataDAO = new ResumeDataDAO();
    console.log("inside 3 in api in index.js")
    const data = await resumeDataDAO.sendUserData(first_name, last_name, phone, email, location, languages);
  });
