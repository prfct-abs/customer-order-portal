import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from "./components/Main";
import './index.css';
import Home from './components/Home';
// import Order from './components/Order';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <div className="container">
      <Main />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/order" element={<Order />} /> */}
      </Routes>
    </div>
  </Router>
);


