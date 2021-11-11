import React from 'react';
import classes from './Feed.module.css';
import { BiWorld, BiCircle, BiBookmark, BiUserCircle } from 'react-icons/bi';
import Card from '../Card/Card';

const Feed = () => {
  return (
    <main className="bg-indigo-900 h-screen">
      <header className={classes.dCenter}>
        <h1 className="text-white">Feed</h1>
        <div className={classes.userSection}>
          <BiUserCircle className={classes.iconUser} />
        </div>
      </header>
      <div className={classes.posts}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <footer className="bg-gray-800">
        <button>
          <BiWorld className={classes.icons} />
        </button>
        <button>
          <BiCircle className={classes.icons} />
        </button>
        <button>
          <BiBookmark className={classes.icons} />
        </button>
      </footer>
    </main>
  );
};

export default Feed;