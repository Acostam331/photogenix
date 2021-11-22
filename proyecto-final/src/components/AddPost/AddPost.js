import React, { useState } from 'react';
import './AddPost.css';
import { FaTimes } from 'react-icons/fa';
import { setNewPost } from '../../services/Posts.services';

const AddPost = ({ setIsNewPost, token }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');

  const addPostHandler = async () => {
    await setNewPost(token, title, desc, image);
  };

  return (
    <div className="add-card w-full bg-gray-800 rounded-3xl absolute z-40">
      <div className="flex flex-nowrap title-container justify-between">
        <div className="m-4"></div>
        <p className="text-white font-thin text-3xl m-4 self-center">
          Nuevo Post
        </p>
        <button
          className="m-8"
          onClick={() => {
            setIsNewPost(false);
          }}
        >
          <FaTimes className="add-icons" />
        </button>
      </div>
      <div className="new-input-container flex flex-col m-8 items-center">
        <form className="w-full flex flex-col items-center justify-center">
          <div className="my-8 sm:w-1/2">
            <h1 className="input-label my-2 text-white">
              Ingresa la URL de tu imagen:
            </h1>
            <input
              className="input-element w-full"
              type="text"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>
          <div className="my-8 sm:w-1/2">
            <h1 className="input-label my-2 text-white">
              Ingresa un titulo para tu post:
            </h1>
            <input
              className="input-element w-full"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="my-8 sm:w-1/2">
            <h1 className="input-label my-2 text-white">
              Ingresa la descripcion de tu post:
            </h1>
            <input
              className="input-element w-full"
              type="text"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              addPostHandler();
            }}
            className="rounded-2xl px-4 py-2 m-8 bg-indigo-900"
          >
            Crear Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
