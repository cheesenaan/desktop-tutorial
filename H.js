api.get('/resume', async (req, res) => {
    try {
        const DAO = new resumeDataDAO();
        const data = DAO.getAllUserData();
        console.log("from object:", data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.handler = async (event, context) => {
    return await api.run(event, context);
};
