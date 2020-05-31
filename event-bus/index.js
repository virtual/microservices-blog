const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Event bus data store
const events = [];

// Now we need to watch for incoming events
app.post('/events', (req, res) => {
  // We don't know what the body will hold yet
  const event = req.body;

  events.push(event);

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  axios.post('http://localhost:4003/events', event);

  res.status(200).send({ status: 'OK' });
});

// Endpoint for all events that ever occurred
app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Event bus listening on 4005')
});