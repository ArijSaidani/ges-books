import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Only set if not already present (so it doesn't overwrite a real login)
const adminUser = {
  id: 1,
  email: "admin@bibliotech.com",
  password: "admin123",
  role: "admin",
  firstName: "Admin",
  lastName: "User",
  token: "admin-token"
};

if (!localStorage.getItem('token')) {
  localStorage.setItem('token', adminUser.token);
  localStorage.setItem('user', JSON.stringify(adminUser));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
