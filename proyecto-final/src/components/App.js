import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="flex justify-center">
      <h1 class="font-thin text-2xl">
        This is a test, you are reading App.js file
      </h1>
      <Link to="/test" className="text-blue-700">
        Switch test
      </Link>
    </div>
  );
};
export default App;
