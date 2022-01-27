import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Nav from './components/nav';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN-JllOYRcr_rO-VF1MWU7XOjZkTXyuAM",
  authDomain: "photo-tagging-3a70f.firebaseapp.com",
  projectId: "photo-tagging-3a70f",
  storageBucket: "photo-tagging-3a70f.appspot.com",
  messagingSenderId: "914940221076",
  appId: "1:914940221076:web:6f25f3c57f22a785d98681"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
