import firebase from 'firebase';

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

const db = firebase.database();
if (window.location.hostname === "localhost") {
  // Point to the RTDB emulator running on localhost.
  db.useEmulator("localhost", 9000);
}

const auth = firebase.auth();
if (window.location.hostname === "localhost") {
  auth.useEmulator("http://localhost:9099");
}

export default firebase;
