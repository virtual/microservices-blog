const express = require('express');
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {

}

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []) // prevents undefined errors!!
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // Get any comments already associated with the given posts
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({
    id: commentId,
    content,
    status: 'pending'
  });

  commentsByPostId[req.params.id] = comments; // save comment

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending'
    }
  })

  res.status(201).send(comments)

});

// receives any event coming from event bus
app.post('/events', async (req,res) => {
  console.log('Received event ', req.body.type);

  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    // find the comment we are already storing and 
    // update its status property
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];

    // find the comment with the id
    const comment = comments.find(comment => {
      return comment.id === id;
    });

    comment.status = status;

    // Now tell every other service in the application that
    // this update just occurred (emit CommentUpdated)
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        status,
        content
      }
    })
  }

  res.send({})
})

app.listen(4001, ()=>{
  console.log('Comments listening on 4001')
})