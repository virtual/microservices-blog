const express = require('express');
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}; // POST actually builds out this object in local storage

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts/create', async (req, res) => {
  const {title} = req.body;
  const id = randomBytes(4).toString('hex');
  posts[id] = {
    id,
    title
  }

  // emit event since posts has been updated/added
  // since this is asynchornous, add async/await
  await axios.post('http://event-bus-srv:4005/events',
  {
    type: 'PostCreated',
    data: {
      id, title
    }
  })

  res.status(201).send(posts[id])
})

// receives any event coming from event bus
app.post('/events', (req,res) => {
  console.log('Received event ', req.body.type);
  res.send({})
})

app.listen(4000, () => {
  console.log('v55');
  console.log("Listening on port 4000")
})