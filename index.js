const express = require('express');
const axios = require('axios');
const app = express();

app.get('/ss', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  const thumbioUrl = `https://image.thum.io/get/width/1920/crop/400/fullpage/noanimate/${url}`;

  try {
    const response = await axios.get(thumbioUrl, { responseType: 'stream' });
    // Pipe the image stream directly to the response
    response.data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the image' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
