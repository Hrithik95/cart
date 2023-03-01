import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC-L5ctYNBcQCENh7vOMYK4EY1EpZKODr0",
    authDomain: "cart-8d2aa.firebaseapp.com",
    projectId: "cart-8d2aa",
    storageBucket: "cart-8d2aa.appspot.com",
    messagingSenderId: "381596626344",
    appId: "1:381596626344:web:1fb76dd04e1667de31819d"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();