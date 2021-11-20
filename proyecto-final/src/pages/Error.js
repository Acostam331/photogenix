import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div>
      <h1>This is an error screen</h1>
      <Link to="/">Back to App.js</Link>
    </div>
  );
};

export default Error;
