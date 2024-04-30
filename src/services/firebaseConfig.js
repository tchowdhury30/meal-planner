// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa5n1DuKpjDunzpCs0bvaj-u4vlrqEkK0",
  authDomain: "meal-planner-c9328.firebaseapp.com",
  projectId: "meal-planner-c9328",
  storageBucket: "meal-planner-c9328.appspot.com",
  messagingSenderId: "453788860023",
  appId: "1:453788860023:web:632cca5177c1f4c6585072",
  measurementId: "G-HWD1LB0SMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);  

  