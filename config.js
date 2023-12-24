//firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//webapps configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUx2YbrcA0jHt83WvghncjZTWTJU9s0Zw",
  authDomain: "test-bed-15521.firebaseapp.com",
  databaseURL: "https://test-bed-15521-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-bed-15521",
  storageBucket: "test-bed-15521.appspot.com",
  messagingSenderId: "571008537563",
  appId: "1:571008537563:web:d1e43f2e389a9911978dfe"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export {firebase, db};