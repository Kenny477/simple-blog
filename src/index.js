import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import './index.css';
import Admin from './pages/admin';
import App from './pages/home';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,

  document.getElementById('root')
);
