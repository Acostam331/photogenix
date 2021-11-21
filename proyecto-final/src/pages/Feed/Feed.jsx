import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { BiUserCircle } from 'react-icons/bi';
import classes from './Feed.module.css';
// import AddPost from '../AddPost/AddPost';
import Card from '../../components/Card/Card';
import { getAllPosts, getFavorites, setNewLike, setNewFavorite } from '../../services/Posts.services';
import Comments from '../../components/Comments/Comments';

const Feed = () => {
  //will change on login
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThjNTIwMzRjZmQ3MDRhZTMzN2Q1OGYiLCJpYXQiOjE2MzcxNjkxNTcsImV4cCI6MTYzODM3ODc1N30.uwvMirGrbvcFBWjxqooJ1s-gFOLyYfbJJk-7_JTVFck';

  // temp token log
  // const username = 'gp3_user@test.com';
  // const password = 'IMeFecQn7IVA3eeH';
  // const { token } = useGetUser(username, password);
  // console.log(token);

  // const { posts, isLoading } = useGetFavorites(token);
  const [posts, setPosts] = useState([]);
  const [tab, setTab]= useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const getData = useCallback(async() => {
    setIsLoading(true);
    let response = {};
    if (tab === 1) {
      response = await getAllPosts(token);
    } else {
      response = await getFavorites(token);
    }

    setPosts(response.posts);
    setIsLoading(response.isLoading);
  }, [tab]);

  useEffect(() => {
    getData();
  }, [tab, getData]);

  const [comments, setComments] = useState({ isComments: false, postId: '' });
  const [alertModal, setAlertModal] = useState({
    isAlert: false,
    message: '',
    type: '',
  });

  const cleanAlert = () => {
    setAlertModal({ isAlert: false, icon: '', message: '', type: '' });
  };

  const addNewLikeHandler = async (id) => {
    let response = await setNewLike(token, id);
    if (response.statusText === "OK") {
      setAlertModal({
        isAlert: true,
        message: 'Has dado like',
        type: 'bg-green-400',
      });

      setTimeout(() => {
        cleanAlert();
      }, 5000);
    }
  };

  const addNewFavHandler = async (id) => {
    let response = await setNewFavorite(token, id);
    if (response.statusText === "OK") {
      setAlertModal({
        isAlert: true,
        message: 'Has guardado como favorito',
        type: 'bg-green-400',
      });

      setTimeout(() => {
        cleanAlert();
      }, 5000);
    }
  };

  const changeTabHandler = (tab) => {
    setTab(tab);
  };

  return (
    <main className="bg-indigo-900 h-screen">
      <header className={classes.dCenter}>
        <h1 className="text-white">Feed</h1>
        <div className={classes.userSection}>
          <Link to="/user">
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
                  token={token}
                  setComments={setComments}
                  addNewLike={() => addNewLikeHandler(post._id)}
                  addNewFav={() => addNewFavHandler(post._id)}
                />
              );
            })}

        {comments.isComments ? (
          <Comments
            comments={comments}
            posts={posts}
            setComments={setComments}
          />
        ) : (
          ''
        )}
      </div>
      <Footer changeTab={(tab) => changeTabHandler(tab)} />
    </main>
  );
};

export default Feed;
