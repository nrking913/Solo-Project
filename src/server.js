const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const buildPath = path.join(__dirname, '..', 'dist');

app.use(express.static(buildPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});
//Im able to see the data and on a previous version I was able to write it to a file. 
//but getting it to pull and then render on the page is tough
app.get('/data', async (req, res) => {
  try {
    const fetch = await import('node-fetch');
    const response = await fetch.default('https://api.coinstats.app/public/v1/charts?period=1m&coinId=bitcoin');
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});