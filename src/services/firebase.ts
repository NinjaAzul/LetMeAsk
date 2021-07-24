import firebase from 'firebase/app';

import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();


const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }


// #Firebase
// REACT_APP_API_KEY="AIzaSyC6FVcEJg4P5COtIv2XsEauTR6ixlSVgTQ"
// REACT_APP_AUTH_DOMAIN="letmeask-24d5d.firebaseapp.com"
// REACT_APP_DATABASE_URL="https://letmeask-24d5d-default-rtdb.firebaseio.com"
// REACT_APP_PROJECT_ID="letmeask-24d5d"
// REACT_APP_STORAGE_BUCKET="letmeask-24d5d.appspot.com"
// REACT_APP_MESSAGIN_SENDER_ID="597696086405"
// REACT_APP_APP_ID="1:597696086405:web:00f25756572e270f6cc4ec"
// REACT_APP_MEASUREMENT_ID="G-03DZPVGXRS"