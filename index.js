const express = require('express');
const axios = require('axios');
const app = express();

app.get('/ss', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  const options = {
    method: 'GET',
    url: 'https://web-capture2.p.rapidapi.com/image',
    params: {
      url: url,
      height: '780',
      width: '1024'
    },
    headers: {
      'X-RapidAPI-Key': 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
      'X-RapidAPI-Host': 'web-capture2.p.rapidapi.com'
    },
    responseType: 'stream' // specify response type as stream to directly pipe it to the client
  };

  try {
    const response = await axios.request(options);
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
