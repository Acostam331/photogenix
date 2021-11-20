import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Feed from './pages/Feed/Feed';
import User from'./pages/User/User';
import Test from './pages/Test';
import Error from './pages/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    {/* changing routes */}
    <Routes>
      {/* default route */}
      <Route path="/" element={<App />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/user" element={<User />} />
      {/* test route */}
      <Route path="test" element={<Test />} />
      {/* error route */}
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
