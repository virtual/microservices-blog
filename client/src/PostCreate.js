import React,{ useState } from 'react';
const axios = require('axios');

const PostCreate = () => {
  const [ title, setTitle ] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post('http://localhost:4000/posts', {
      title
    })

    // onsubmit clear out input
    setTitle('');
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input value={title} 
            onChange={e=> setTitle(e.target.value)}
            className="form-control"/>
        </div>
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  )
} 
export default PostCreate;
 