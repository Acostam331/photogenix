// import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = 'https://posts-pw2021.herokuapp.com/api/v1';

// user login custom hook
// export const useGetUser = (username, password) => {
//   const [token, setToken] = useState([]);

//   const getUser = useCallback(async () => {
//     try {
//       const user = await axios({
//         method: 'POST',
//         baseURL: BASE_URL,
//         url: '/auth/signin',
//         headers: { 'content-type': 'application/json' },
//         data: {
//           username: `${username}`,
//           password: `${password}`,
//         },
//       });
//       if (user) {
//         setToken(user.data.token);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, [username, password]);

//   useEffect(() => {
//     getUser();
//   }, [username, password, getUser]);

//   return { token };
// };
const services = {};

services.login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  return {};
};

services.verifyToken = async (token) => {
  let res = {};
  try {
    const response = await fetch(`${BASE_URL}/auth/whoami`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      res = data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    return res;
  }
};

export default services;
