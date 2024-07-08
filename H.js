api.get('/resume', async (req, res) => {
  try {
    const data = await fetchDataAndLog();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
