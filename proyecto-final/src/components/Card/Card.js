import React from 'react';
import './card.css';
// import { BsBookmarkFill, BsFillHeartFill } from 'react-icons/bs';
import { BiHeart, BiBookmark, BiUserCircle } from 'react-icons/bi';

const Card = ({
  title,
  description,
  image,
  user,
  setAlertModal,
  cleanAlert,
}) => {
  return (
    <div className="square bg-gray-800 rounded-3xl">
      <div className="flex p-4">
        <BiUserCircle className="user-icon mr-2" />
        <h3 className="text-white">{user.username}</h3>
      </div>
      <div className="flex justify-center items-center">
        <img src={image} className="card-img" alt={title} />
      </div>
      <p className="text-white font-thin text-3xl px-8">{title}</p>
      <div className="flex flex-col items-center justify-center px-8 pb-8">
        <h2 className="text-gray-300">{description}</h2>
      </div>
      <div className="flex justify-end px-8 pb-8">
        <button>
          {/* <BiHeart className="card-icons heart-icon" /> */}
          <BiHeart
            className="card-icons heart-icon mx-2"
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
          />
        </button>
        <button>
          <BiBookmark
            className="card-icons bookmark-icon ml-2"
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
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
