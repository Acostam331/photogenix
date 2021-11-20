import React from 'react';
import { Link } from 'react-router-dom';

const Test = () => {
  return (
    <div className="flex justify-center">
      <h1 class="font-thin text-2xl">
        This is a test, you are reading Test.js file
      </h1>
      <Link to="/" className="text-blue-700">
        Switch test
      </Link>
    </div>
  );
};

export default Test;
