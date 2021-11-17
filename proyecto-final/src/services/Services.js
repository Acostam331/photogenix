import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// user login custom hook
export const useGetUser = (username, password) => {
  const [token, setToken] = useState([]);

  const getUser = useCallback(async () => {
    try {
      const user = await axios({
        method: 'POST',
        baseURL: 'https://posts-pw2021.herokuapp.com/api/v1',
        url: '/auth/signin',
        headers: { 'content-type': 'application/json' },
        data: {
          username: `${username}`,
          password: `${password}`,
        },
      });
      if (user) {
        setToken(user.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  }, [username, password]);

  useEffect(() => {
    getUser();
  }, [username, password, getUser]);

  return { token };
};

// Get all posts custom hook
export const useGetAll = (token) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    try {
      const posts = await axios({
        method: 'GET',
        baseURL: 'https://posts-pw2021.herokuapp.com/api/v1',
        url: '/post/all?limit=15&page=0',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (posts) {
        setPosts(posts.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    getPosts();
  }, [token, getPosts]);

  return { isLoading, posts };
};
