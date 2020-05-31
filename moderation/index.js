const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// whenever we see CommentCreated, 
// the CommentModerated event is emitted

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status: status,
        content: data.content
      }
    });
  }
  res.send({}); // otherwise request hangs
})

app.listen(4003, function() {
  console.log("moderation service listening on port 4003")
})