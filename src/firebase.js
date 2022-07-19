// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFvXaFXupFMtJ7XkMd9Iu_MztB3FfHNB4",
  authDomain: "reactplay-63f17.firebaseapp.com",
  projectId: "reactplay-63f17",
  storageBucket: "reactplay-63f17.appspot.com",
  messagingSenderId: "58036014530",
  appId: "1:58036014530:web:5daf24d9237f8761ea1a5b",
  databaseURL:
    "https://reactplay-63f17-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const database = getDatabase(app);
