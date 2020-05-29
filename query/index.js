const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Dont need axios since it won't need to emit events?

const app = express();
app.use(bodyParser.json());
app.use(cors());

// GET /posts
// POST /events
// Decide on a data structure for all the comments
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

// receives events from event bus
app.post('/events', (req, res) => {
  const { type, data } = req.body;

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
  
  // Node doesn't show content of nested structures 
  // to save on output clutter
  // console.log(posts);
  // Still a route handle so be sure to return something
  res.send({});
});

app.listen(4002, ()=>{
  console.log("Query service listening on 4002")
})