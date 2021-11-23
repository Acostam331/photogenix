import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';
import Footer from './Footer';
import { BiUserCircle } from 'react-icons/bi';
import classes from './Feed.module.css';
import Card from '../../components/Card/Card';
import {
  getAllPosts,
  getFavorites,
  setNewLike,
  setNewFavorite,
  setStatusPost,
} from '../../services/Posts.services';
import Comments from '../../components/Comments/Comments';
import AddPost from '../../components/AddPost/AddPost';

const Feed = () => {
  const { token, user } = useUserContext();
  const role = user.role;
  const username = user.username;
  // temp token log
  // const username = 'gp3_user@test.com';
  // const password = 'IMeFecQn7IVA3eeH';

  // temp admin token log
  // const username = 'gp3_admin@test.com';
  // const password = 'DRFdQpXsxhB7ESFl';

  // const { posts, isLoading } = useGetFavorites(token);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState(1);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState({ isComments: false, postId: '' });
  const [alertModal, setAlertModal] = useState({
    isAlert: false,
    message: '',
    type: '',
  });

  // TO CHANGE ON ADMIN FEED
  const [isNewPost, setIsNewPost] = useState(false);

  const getData = useCallback(async () => {
    console.log("Obteniendo posts: page", page);
    setIsLoading(true);
    let response = {};
    if (tab === 1) {
      response = await getAllPosts(token, page);
      setPosts(prevPosts => {
        return [...prevPosts, ...response.posts];
      });
    } else {
      response = await getFavorites(token);
      setPosts(response.posts);
    }

    setIsLoading(response.isLoading);
  }, [tab, page, token]);

  useEffect(() => {
    getData();
  }, [tab, page, getData]);

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
      }, 5000);
    }
  };

  const addNewLikeHandler = async (id) => {
    let response = await setNewLike(token, id);
    if (response.statusText === 'OK') {
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
    if (response.statusText === 'OK') {
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
    setPosts([]);
    setTab(tab);
  };

  const pageChange = () => {
    console.log("Page change!!");
    setPage(page + 1)
  };

  console.log(posts);

  return (
    // html and design
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
            className={`flex py-2 px-8 w-5/6 alert-card rounded-3xl z-50 ${classes.alertCard} ${alertModal.type}`}
          >
            <p className="mx-4 text-white">{alertModal.message}</p>
          </div>
        ) : (
          ''
        )}

        {posts.map((post) => {
          return (
            <Card
              key={post._id}
              {...post}
              token={token}
              setComments={setComments}
              addNewLike={() => addNewLikeHandler(post._id)}
              addNewFav={() => addNewFavHandler(post._id)}
              addStatus={() => addStatusHandler(post._id)}
              role={role}
              username={username}
            />
          );
        })}
        {isLoading ? 'loading...' : ''}
        {<button type="button" onClick={() => pageChange()}>Get more</button>}
        
        {comments.isComments ? (
          <Comments
            comments={comments}
            posts={posts}
            setComments={setComments}
            token={token}
            setAlertModal={setAlertModal}
            cleanAlert={cleanAlert}
          />
        ) : (
          ''
        )}
        {isNewPost ? (
          <AddPost
            token={token}
            setIsNewPost={setIsNewPost}
            setAlertModal={setAlertModal}
            cleanAlert={cleanAlert}
          />
        ) : (
          ''
        )}
      </div>
      <Footer
        changeTab={(tab) => changeTabHandler(tab)}
        role={role}
        setIsNewPost={setIsNewPost}
      />
    </main>
  );
};

export default Feed;
