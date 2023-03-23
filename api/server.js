const express = require('express');
const request = require('request');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/covid', (req, res) => {
  request(
    { url: 'https://covid19.traffy.in.th/api/state-covid19' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

// Using cors as a middleware
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/src/index.js'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});