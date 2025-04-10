// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getDatabase } from "firebase/database"; 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4q5p-ZxkDtgNx1EcSMLkS2hiGBwwWR3E",
  authDomain: "violence-detection-a8c5f.firebaseapp.com",
  databaseURL: "https://violence-detection-a8c5f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "violence-detection-a8c5f",
  storageBucket: "violence-detection-a8c5f.firebasestorage.app",
  messagingSenderId: "199970519947",
  appId: "1:199970519947:web:fd4055b3a9312159528d8e",
  measurementId: "G-62FF9XT0EM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };