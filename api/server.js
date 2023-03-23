const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;
const corsOpts = {
        origin: '*',
      
        methods: [
          'GET',
          'POST',
        ],
      
        allowedHeaders: [
          'Content-Type',
        ],
        crossorigin: true, 
        credentials: true, 
        origin: true,
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
      };
      
app.use(cors(corsOpts)
);
app.use(function(req, res, next) {
  res.removeHeader('x-powered-by');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Using cors as a middleware
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/src/index.js'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});