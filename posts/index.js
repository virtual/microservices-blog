const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
const { randomBytes } = require('crypto')

const posts = {};

app.get('/post', (req, res) => {
  res.send(posts)
})

app.post('/post', (req, res) => {
  const {title} = req.body;
  const id = randomBytes(4).toString('hex');
  posts[id] = {
    id,
    title
  }
  res.status(201).send(posts[id])
})

app.listen(4000, () => {
  console.log("Listening on port 4000")
})