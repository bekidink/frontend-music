// Import the functions you need from the SDKs you need
import { getApp,getApps,initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBXw1d-JlqvCHKksaJ2xLBDCyMh9FGElL8",
  authDomain: "music-player-cf346.firebaseapp.com",
  projectId: "music-player-cf346",
  storageBucket: "music-player-cf346.appspot.com",
  messagingSenderId: "1089126389730",
  appId: "1:1089126389730:web:d6d5b14bd911fc46f58bbb"
};

// Initialize Firebase
const app = getApps.length>0?getApp(): initializeApp(firebaseConfig);
const storage=getStorage(app)
export {app,storage}