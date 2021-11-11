import React from 'react';
import './card.css';
import { BiBookmark, BiHeart } from 'react-icons/bi';

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
      <div className="flex flex-col items-center justify-center text-justify px-8 pb-8">
        <p className="text-white font-thin text-3xl">Title</p>
        <h2 className="text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          natus voluptates, nisi unde sed asperiores earum? Similique nulla modi
          officia.
        </h2>
      </div>
      <div className="flex justify-end px-8 pb-8">
        <button className="mx-2">
          <BiHeart className="card-icons heart-icon" />
        </button>
        <button className="mx-2">
          <BiBookmark className="card-icons bookmark-icon mx-2" />
        </button>
      </div>
    </div>
  );
};

export default Card;
