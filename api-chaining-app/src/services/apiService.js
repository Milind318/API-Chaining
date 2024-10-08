// src/services/apiService.js

import axios from 'axios';

// API Base URL
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// GET Users List
export const fetchUsers = () => {
  return axios.get(`${BASE_URL}/users`);
};

// POST Create New Post
export const createPost = (postData) => {
  return axios.post(`${BASE_URL}/posts`, postData);
};

// GET Comments by Post ID
export const fetchComments = (postId) => {
  return axios.get(`${BASE_URL}/comments`, { params: { postId } });
};
