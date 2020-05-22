import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');
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
      lorem 
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