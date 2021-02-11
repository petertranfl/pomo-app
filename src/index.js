import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var config = {
    apiKey: "AIzaSyB0g6CetZVczzjhx3iguj-i4Yd_bYDUmSA",
    authDomain: "pomodoro-29592.firebaseapp.com",
    databaseURL: "https://pomodoro-29592-default-rtdb.firebaseio.com",
    projectId: "pomodoro-29592",
    storageBucket: "pomodoro-29592.appspot.com",
    messagingSenderId: "340646152001",
    appId: "1:340646152001:web:c8634b88909fcc8b7cc3c0",
    measurementId: "G-B7XBQ8NSL2"
};

firebase.initializeApp(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
