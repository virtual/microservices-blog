import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import CommentCreate from './CommentCreate';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://posts.com/posts');
    // axios returns data object
    setPosts(res.data);
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  
  // Object.values is a built-in JS function to return array
  const renderedPosts = Object.values(posts).map(post => {
    return (
    <div 
    key={post.id}
    className="card"
    style={{width: '30%', marginBottom: '20px', marginRight: '20px'}}>
      <div className="card-title p-3">
      <h2>{post.title}</h2>
        </div>
      <div className="card-body">
        <h3>Comments</h3>
        <CommentList comments={post.comments} /> 
        <CommentCreate postId={post.id} />  
      </div>
    </div>
    );
  })
  return(
    <div className="d-flex flex-row flex-wrap justify-content-start">
      {renderedPosts}
    </div>
  )
}
export default PostList;