const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Now we need to watch for incoming events
app.post('/events', (req, res) => {
  // We don't know what the body will hold yet
  const event = req.body;

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);

  res.status(200);
});

app.listen(4005, () => {
  console.log('Event bus listening on 4005')
});