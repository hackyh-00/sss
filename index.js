const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/ss', (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  const screenshotAPIUrl = `https://api.screenshotone.com/take?access_key=zMccWr1hFTRAyg&url=${encodeURIComponent(url)}&viewport_width=1920&viewport_height=1080&device_scale_factor=1&image_quality=80&format=jpg&block_ads=true&block_cookie_banners=true&full_page=false&block_trackers=true&block_banners_by_heuristics=false&delay=0&timeout=60`;

  axios.get(screenshotAPIUrl, { responseType: 'arraybuffer' })
    .then(response => {
      const contentType = response.headers['content-type'];
      if (contentType && contentType.startsWith('image')) {
        res.set('Content-Type', contentType);
        res.send(response.data);
      } else {
        console.error('Invalid or missing Content-Type header in the response:', contentType);
        res.status(500).json({ error: 'Invalid or missing Content-Type header in the response' });
      }
    })
    .catch(error => {
      console.error('Error fetching screenshot:', error);
      res.status(500).json({ error: 'An error occurred while fetching the screenshot' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
