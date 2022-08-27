import { initializeApp } from "firebase/app";
import {
 GoogleAuthProvider,
 getAuth,
 signInWithPopup,
 signInWithEmailAndPassword,
 createUserWithEmailAndPassword,
 sendPasswordResetEmail,
 signOut,
 onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {

  apiKey: "AIzaSyDLADN3SbdtVH22fK3RPOuYS6c4OoX88dg",

  authDomain: "medistore-bc0bc.firebaseapp.com",

  projectId: "medistore-bc0bc",

  storageBucket: "medistore-bc0bc.appspot.com",

  messagingSenderId: "444507360025",

  appId: "1:444507360025:web:f4e1d23a4d13a14c59d388",

  measurementId: "G-L173GK65MM"

};

const fAuth = {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
 };



const app = initializeApp(firebaseConfig);

export {fAuth} ;
