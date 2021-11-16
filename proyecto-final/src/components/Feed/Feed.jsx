import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import classes from './Feed.module.css';
import AddPost from '../AddPost/AddPost';
import { BiWorld, BiCircle, BiBookmark, BiUserCircle } from 'react-icons/bi';
import Card from '../Card/Card';

const Feed = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertModal, setAlertModal] = useState({
    isAlert: false,
    message: '',
    type: '',
  });

  // Will change on login
  const tempUser = async () => {
    try {
      const response = await fetch(
        'https://posts-pw2021.herokuapp.com/api/v1/auth/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'gp3_user@test.com',
            password: 'IMeFecQn7IVA3eeH',
          }),
        }
      );
      const user = await response.json();

      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllData = useCallback(async () => {
    const response = await fetch(
      'https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=15&page=0',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const posts = await response.json();

    if (posts) {
      setData(posts.data);
    }
  }, [user.token]);

  useEffect(() => {
    tempUser();
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [user, fetchAllData]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [data]);

  const cleanAlert = () => {
    setAlertModal({ isAlert: false, icon: '', message: '', type: '' });
  };

  return (
    <main className="bg-indigo-900 h-screen">
      <header className={classes.dCenter}>
        <h1 className="text-white">Feed</h1>
        <div className={classes.userSection}>
          {/* pending */}
          <Link to="/">
            <BiUserCircle className={classes.iconUser} />
          </Link>
        </div>
      </header>
      <div className={classes.posts}>
        {/* alert modal */}
        {alertModal.isAlert ? (
          <div
            className={`flex py-2 px-8 w-5/6 alert-card rounded-3xl ${classes.alertCard} ${alertModal.type}`}
          >
            <p className="mx-4 text-white">{alertModal.message}</p>
          </div>
        ) : (
          ''
        )}
        <AddPost />
        {isLoading
          ? 'loading...'
          : data.map((post) => {
              return (
                <Card
                  key={post._id}
                  {...post}
                  cleanAlert={cleanAlert}
                  setAlertModal={setAlertModal}
                />
              );
            })}
      </div>
      <footer className="bg-gray-800">
        <button>
          <BiWorld className={classes.icons} />
        </button>
        <button>
          <BiCircle className={classes.icons} />
        </button>
        <button>
          <BiBookmark className={classes.icons} />
        </button>
      </footer>
    </main>
  );
};

export default Feed;
