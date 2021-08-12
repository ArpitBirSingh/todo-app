import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyADrYxrl_LAyNTAy0jTok69t9x1poP7AEc",
    authDomain: "todo-app-5d557.firebaseapp.com",
    projectId: "todo-app-5d557",
    storageBucket: "todo-app-5d557.appspot.com",
    messagingSenderId: "604229947810",
    appId: "1:604229947810:web:0c310156fe5ec63337a2fb",
    measurementId: "G-19DEHBN7G8"
  };

firebase.initializeApp(firebaseConfig);


  
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { db, auth, provider };

