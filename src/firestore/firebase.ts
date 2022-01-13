// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv3VFPLMmmoLWjc8QWS3mrbVGV1pmgIro",
  authDomain: "chocodo-dev.firebaseapp.com",
  projectId: "chocodo-dev",
  storageBucket: "chocodo-dev.appspot.com",
  messagingSenderId: "134510257329",
  appId: "1:134510257329:web:3218c84d6d70bdcc752e90",
  measurementId: "G-1DQ3DKH4DK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);