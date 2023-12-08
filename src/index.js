import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './internal/App';
import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
