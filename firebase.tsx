// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY5etxly4z0gyqHBO0Yo0hoSsOFPGsJN4",
  authDomain: "todolistapp-377ea.firebaseapp.com",
  projectId: "todolistapp-377ea",
  storageBucket: "todolistapp-377ea.firebasestorage.app",
  messagingSenderId: "111385080895",
  appId: "1:111385080895:web:0c818e29dd63e9b6f3b48a",
  measurementId: "G-J9S15FB71F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);