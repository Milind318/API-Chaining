// src/components/APIChain.js

import React, { useState } from 'react';
import { fetchUsers, createPost, fetchComments } from '../services/apiService';

const APIChain = () => {
  // State variables to store data from each API call
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  
  // State for input fields
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Step 1: Fetch Users
  const getUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Step 2: Create a New Post
  const createNewPost = async () => {
    if (!selectedUserId || !title || !body) {
      alert('Please select a user and enter title and body!');
      return;
    }

    const postData = { title, body, userId: selectedUserId };
    try {
      const response = await createPost(postData);
      setPost(response.data);
      fetchPostComments(response.data.id); // Chain the next call to fetch comments
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Step 3: Fetch Comments by Post ID
  const fetchPostComments = async (postId) => {
    try {
      const response = await fetchComments(postId);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <div className="container">
      {/* Fetch Users */}
      <button onClick={getUsers}>Fetch Users</button>

      {/* Display Users */}
      {users.length > 0 && (
        <div>
          <h3>Select a User:</h3>
          <select onChange={(e) => setSelectedUserId(e.target.value)}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Post Creation Form */}
      <div className="post-form">
        <h3>Create a New Post:</h3>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Post Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button onClick={createNewPost}>Create Post</button>
      </div>

      {/* Display Post Details */}
      {post && (
        <div className="post-details">
          <h3>Post Created:</h3>
          <p>Title: {post.title}</p>
          <p>Body: {post.body}</p>
        </div>
      )}

      {/* Display Comments */}
      {comments.length > 0 && (
        <div className="comments-section">
          <h3>Comments:</h3>
          {comments.map((comment) => (
            <div key={comment.id}>
              <strong>{comment.name}</strong>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default APIChain;
