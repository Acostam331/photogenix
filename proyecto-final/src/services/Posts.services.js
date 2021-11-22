/* import { useState, useEffect, useCallback } from 'react'; */
import axios from 'axios';

const BASE_URL = 'https://posts-pw2021.herokuapp.com/api/v1';

// user login custom hook
/*export const useGetUser = (username, password) => {
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
};*/
const services = {};

services.login = async (username, password) => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    return {};
}

services.verifyToken = async (token) => {
    const response = await fetch(`${BASE_URL}/auth/whoami`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    return {};
}


export default services;

// Get all posts custom hook
/*
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
        // console.log(posts.data.data);
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
};*/

export const getAllPosts = async (token) => {
  let response = undefined;
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
      // console.log(posts.data.data);
      response = posts.data.data;
    }
  } catch (error) {
    console.log(error);
  }

  return { isLoading: false, posts: response ?? [] };
};

/* one post */

export const getOnePost = async (token, id) => {
  let response = undefined;
  try {
    response = await axios({
      method: 'GET',
      baseURL: BASE_URL,
      url: `/post/one/${id}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      response = response.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return response;
  }
};

/* Favorite posts */

const getFavoritesIds = async (token) => {
  let response = undefined;
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
      response = posts.data.favorites;
      // console.log(posts);
    }
  } catch (error) {
    console.log(error);
  }

  return response ?? [];
};

/*
export const useGetFavorites = (token) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getFavoritePosts = useCallback(async () => {
    const id_array = await getFavoritesIds(token);
    const promisesArray = id_array.map((id) => getOnePost(token, id));
    const results = await Promise.all(promisesArray);

    setPosts(results);
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    getFavoritePosts();
  }, [token, getFavoritePosts]);

  return { isLoading, posts };
} */

export const getFavorites = async (token) => {
  const id_array = await getFavoritesIds(token);
  const promisesArray = id_array.map((id) => getOnePost(token, id));
  const results = await Promise.all(promisesArray);

  return { isLoading: false, posts: results ?? [] };
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
  } finally {
    return response;
  }
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
  } finally {
    return response;
  }
};

// Comment Posts
export const setNewComment = async (token, id, message) => {
  let response = undefined;
  try {
    response = await axios({
      method: 'PATCH',
      baseURL: BASE_URL,
      url: `/post/comment/${id}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        description: `${message}`,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    return response;
  }
};
