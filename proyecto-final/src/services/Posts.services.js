import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = 'https://posts-pw2021.herokuapp.com/api/v1';

// user login custom hook
export const useGetUser = (username, password) => {
  const [token, setToken] = useState([]);

  const getUser = useCallback(async () => {
    try {
      const user = await axios({
        method: 'POST',
        baseURL: BASE_URL,
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
        baseURL: BASE_URL,
        url: '/post/all?limit=15&page=0',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (posts) {
        // console.log(posts);
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

/* Favorite posts */

export const useGetFavorites = (token) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getFavoritePosts = useCallback(async () => {
    try {
      const posts = await axios({
        method: 'GET',
        baseURL: BASE_URL,
        url: '/post/fav',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (posts) {
        console.log(posts);
        setPosts(posts.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    getFavoritePosts();
  }, [token, getFavoritePosts]);

  return { isLoading, posts };
};

export const setNewFavorite = async (token, id) => {
  let response = undefined;
  try {
    response = await axios({
      method: 'PATCH',
      baseURL: BASE_URL,
      url: `/post/fav/${id}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return response;
};

/* Like posts */

export const setNewLike = async (token, id) => {
  let response = undefined;
  try {
    response = await axios({
      method: 'PATCH',
      baseURL: BASE_URL,
      url: `/post/like/${id}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return response;
};