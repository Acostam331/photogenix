import React from 'react';
import './card.css';

import { BiHeart, BiBookmark, BiUserCircle, BiComment } from 'react-icons/bi';

const Card = ({
  _id,
  title,
  description,
  image,
  user,
  likes,
  comments,
  setAlertModal,
  cleanAlert,
  setComments,
}) => {
  return (
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
        <div className="flex">
          {likes.length > 0 ? <p className="text-white">{likes.length}</p> : ''}
          <button
            onClick={() => {
              setAlertModal({
                isAlert: true,
                message: 'Has dado like',
                type: 'bg-green-400',
              });

              setTimeout(() => {
                cleanAlert();
              }, 5000);
            }}
          >
            <BiHeart className="card-icons heart-icon mx-2" />
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
              setAlertModal({
                isAlert: true,
                message: 'Has guardado como favorito',
                type: 'bg-green-400',
              });

              setTimeout(() => {
                cleanAlert();
              }, 5000);
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
