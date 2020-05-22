import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({postId}) => {
  const [comments, setComments] = useState([]); // match to what is returned by api

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    // axios returns array 
    setComments(res.data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  
  // Object.values is a built-in JS function to return array
  const renderedComments = comments.map(comment => {
    return (
    <li 
    key={comment.id}>{comment.content}</li>
    );
  })
  return(
    <ul>
      {renderedComments}
    </ul>
  )
}
export default CommentList;