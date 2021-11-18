import React from 'react';
import './Comments.css';
import { FaTimes } from 'react-icons/fa';
import { BiUserCircle, BiCommentX, BiCommentEdit } from 'react-icons/bi';

const Comments = ({ comments, setComments, posts }) => {
  const newPost = posts.find((post) => post._id === comments.postId);

  return (
    <div className="comment-card sm:w-4/5 w-11/12 h-3/4 bg-gray-800 rounded-3xl absolute">
      <div className="flex flex-nowrap title-container justify-between">
        <div className="m-4"></div>
        <p className="text-white font-thin text-3xl m-4">Comentarios</p>
        <button
          className="m-4"
          onClick={() => {
            setComments({ isComments: false, postId: '' });
          }}
        >
          <FaTimes className="comments-icons" />
        </button>
      </div>

      {newPost.comments.length === 0 ? (
        <div className="flex flex-col justify-center items-center comments-container">
          <BiCommentX className="no-comments-icon" />
          <p className="text-white">No hay comentarios, se el primero</p>
        </div>
      ) : (
        <div className="flex flex-col comments-container">
          {newPost.comments.map((comment) => {
            const { _id, user, description } = comment;

            return (
              <div
                key={_id}
                className="m-4 border border-indigo-900 rounded-3xl"
              >
                <div className="flex p-4">
                  <BiUserCircle className="user-icon mr-2" />
                  <p className="text-white">{user.username}</p>
                </div>
                <p className="text-white mx-4 mb-4">{description}</p>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex input-container">
        <input
          className="comment-input ml-auto my-auto p-4 rounded-3xl"
          type="text"
        />
        <button className="m-auto">
          <BiCommentEdit className="new-comment-icon" />
        </button>
      </div>
    </div>
  );
};

export default Comments;
