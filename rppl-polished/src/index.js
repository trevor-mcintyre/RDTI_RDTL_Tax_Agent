import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // ← important: must match the actual filename
import './index.css'; // optional – include if you have it

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);