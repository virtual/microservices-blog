const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// GET /posts
// POST /events
// Decide on a data structure for all the comments
const posts = {};

const handleEvents = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    const comment = post.comments.find(comment => {
      return comment.id === id;
    });
    // then updated that comment
    comment.status = status;
    comment.content = content;
  }
}

app.get('/posts', (req, res) => {
  res.send(posts);
});

// receives events from event bus
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  // Move all if statements into a helper function
  handleEvents( type, data );

  // Node doesn't show content of nested structures 
  // to save on output clutter
  // console.log(posts);
  // Still a route handle so be sure to return something
  res.send({});
});

app.listen(4002, async ()=>{
  console.log("Query service listening on 4002");

  // Each time service comes online
  // Make a request over to event bus
  // and get a listing of the events that have been emitted
  const res = await axios.get('http://event-bus-src:4005/events');

  for (let event of res.data) {
    console.log("Processing event: ", event.type);
    handleEvents(event.type, event.data);
  }
})