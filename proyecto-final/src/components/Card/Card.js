import React from 'react';
import './card.css';
import { BiBookmark, BiHeart } from 'react-icons/bi';
import { BsBookmarkFill, BsFillHeartFill } from 'react-icons/bs';

const Card = () => {
  return (
    <div className="square bg-gray-800 rounded-3xl">
      <div className="flex justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1590198957403-f95561a7c5ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2090&q=80"
          className="card-img"
          alt=""
        />
      </div>
      <p className="text-white font-thin text-3xl px-8">Title</p>
      <div className="flex flex-col items-center justify-center text-justify px-8 pb-8">
        <h2 className="text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          natus voluptates, nisi unde sed asperiores earum? Similique nulla modi
          officia.
        </h2>
      </div>
      <div className="flex justify-end px-8 pb-8">
        <button>
          {/* <BiHeart className="card-icons heart-icon" /> */}
          <BsFillHeartFill className="card-icons heart-icon mx-2" />
        </button>
        <button>
          <BsBookmarkFill className="card-icons bookmark-icon ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Card;
