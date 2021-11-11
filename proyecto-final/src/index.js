import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Feed from './components/Feed/Feed';
import Test from './components/Test';
import Error from './components/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    {/* changing routes */}
    <Routes>
      {/* default route */}
      <Route path="/" element={<App />} />
      <Route path="/feed" element={<Feed />} />
      {/* test route */}
      <Route path="test" element={<Test />} />
      {/* error route */}
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
