import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BiHome } from 'react-icons/bi';
import classes from './MyPosts.module.css';
import Card from '../../components/Card/Card';
import { getMyPosts, setStatusPost } from '../../services/Posts.services';
import { useUserContext } from '../../Context/UserContext';
import InfiniteScroll from 'react-infinite-scroll-component';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const { token, user } = useUserContext();
  const role = user.role;
  const username = user.username;
  const isMyPost = true;
  const [isLoading, setIsLoading] = useState(true);
  const [alertModal, setAlertModal] = useState({
    isAlert: false,
    message: '',
    type: '',
  });

  const getData = useCallback(async () => {
    console.log('Obteniendo posts: page', page);
    setIsLoading(true);
    let response = {};
    try {
      response = await getMyPosts(token, page);

      setPosts((prevPosts) => {
        return [...prevPosts, ...response.posts];
      });
      setIsLoading(response.isLoading);
    } catch (error) {
      console.log(error);
    }
  }, [token, page]);

  useEffect(() => {
    getData();
  }, [getData]);

  console.log(posts);

  const cleanAlert = () => {
    setAlertModal({ isAlert: false, icon: '', message: '', type: '' });
  };

  const addStatusHandler = async (id) => {
    let response = await setStatusPost(token, id);
    if (response.statusText === 'OK') {
      setAlertModal({
        isAlert: true,
        message: 'Has cambiado el estado de este post',
        type: 'bg-green-400',
      });

      setTimeout(() => {
        cleanAlert();
      }, 2000);
    }
  };

  return (
    <main className="bg-indigo-900 h-screen">
      <header className={classes.dCenter}>
        <h1 className="text-white">Mis Posts</h1>
        <div className={classes.userSection}>
          <Link to="/feed">
            <BiHome className={classes.iconUser} />
          </Link>
        </div>
      </header>
      <div id="scrollable" className={classes.posts}>
        {alertModal.isAlert ? (
          <div
            className={`flex py-2 px-8 w-5/6 alert-card rounded-3xl z-50 ${classes.alertCard} ${alertModal.type}`}
          >
            <p className="mx-4 text-white">{alertModal.message}</p>
          </div>
        ) : (
          ''
        )}
        <InfiniteScroll
          dataLength={posts.length}
          next={() => setPage(page + 1)}
          hasMore={true}
          scrollableTarget="scrollable"
        >
          {posts.map((post) => {
            return (
              <Card
                key={post._id}
                {...post}
                token={token}
                role={role}
                username={username}
                isMyPost={isMyPost}
                addStatus={() => addStatusHandler(post._id)}
              />
            );
          })}
        </InfiniteScroll>
        {isLoading ? 'loading...' : ''}
      </div>
    </main>
  );
};

export default MyPosts;
