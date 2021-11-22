import React, { useEffect, useState } from 'react';
import './card.css';

import {
  BiHeart,
  BiBookmark,
  BiUserCircle,
  BiComment,
  BiPencil,
  BiBlock,
} from 'react-icons/bi';

const Card = ({
  _id,
  title,
  description,
  image,
  user,
  likes,
  comments,
  setComments,
  role,
  addNewLike = () => {},
  addNewFav = () => {},
}) => {
  const [isMine, setIsMine] = useState(false);
  let myuser = 'gp3_user'; // tmp...

  const setNewFav = () => {
    addNewFav();
  };

  useEffect(() => {
    likes.forEach((user) => {
      if (user.username === myuser) {
        setIsMine(true);
      }
    });
  }, [likes, myuser]);

  return (
    // html and design
    <div className="square bg-gray-800 rounded-3xl">
      <div className="flex p-4">
        <BiUserCircle className="user-icon mr-2" />
        <h3 className="text-white">{user.username}</h3>
      </div>
      <div className="flex justify-center items-center w-11/12 h-72 sm:h-96 mx-auto">
        <img src={image} className="card-img" alt={title} />
      </div>
      <div className="flex flex-col items-center p-4 pb-4">
        <p className="text-white font-thin text-3xl">{title}</p>
        <h2 className="text-gray-300">{description}</h2>
      </div>
      <div className="flex justify-end px-4 pb-4">
        {role === 'user' ? (
          ''
        ) : (
          <>
            <div className="flex">
              <button>
                <BiPencil className="card-icons edit-icon mx-2" />
              </button>
            </div>
            <div className="flex">
              <button>
                <BiBlock className="card-icons block-icon mx-2" />
              </button>
            </div>
          </>
        )}
        <div className="flex">
          {likes.length > 0 ? <p className="text-white">{likes.length}</p> : ''}
          <button
            onClick={() => {
              addNewLike();
            }}
          >
            <BiHeart
              className={`card-icons heart-icon mx-2 ${
                isMine && 'icon-filled'
              }`}
            />
          </button>
        </div>
        <div className="flex">
          {comments.length > 0 ? (
            <p className="text-white">{comments.length}</p>
          ) : (
            ''
          )}
          <button
            onClick={() => {
              setComments({ isComments: true, postId: `${_id}` });
            }}
          >
            <BiComment className="card-icons comment-icon mx-2" />
          </button>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              setNewFav();
            }}
          >
            <BiBookmark className="card-icons bookmark-icon ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
