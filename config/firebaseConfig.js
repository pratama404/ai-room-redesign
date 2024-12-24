// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-interior-design-d3755.firebaseapp.com",
  projectId: "ai-interior-design-d3755",
  storageBucket: "ai-interior-design-d3755.firebasestorage.app",
  messagingSenderId: "368263597668",
  appId: "1:368263597668:web:8eaaa2cfa48a47e16d9971"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);