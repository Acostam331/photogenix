import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Feed.module.css';
// import AddPost from '../AddPost/AddPost';
import { BiWorld, BiCircle, BiBookmark, BiUserCircle } from 'react-icons/bi';
import Card from '../Card/Card';
import { useGetAll } from '../../services/Services';

const Feed = () => {
  //will change on login
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThjNTIwMzRjZmQ3MDRhZTMzN2Q1OGYiLCJpYXQiOjE2MzcxNjkxNTcsImV4cCI6MTYzODM3ODc1N30.uwvMirGrbvcFBWjxqooJ1s-gFOLyYfbJJk-7_JTVFck';

  // temp token log
  // const username = 'gp3_user@test.com';
  // const password = 'IMeFecQn7IVA3eeH';
  // const { token } = useGetUser(username, password);
  // console.log(token);

  const { posts, isLoading } = useGetAll(token);
  const [alertModal, setAlertModal] = useState({
    isAlert: false,
    message: '',
    type: '',
  });

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
        {/* <AddPost /> */}
        {isLoading
          ? 'loading...'
          : posts.map((post) => {
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
