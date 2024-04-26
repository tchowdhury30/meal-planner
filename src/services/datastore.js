// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

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
const db = getDatabase(app); // Get the database instance

export function saveMeal({ mealName, recipe, mealType, day }, callback) {
    const mealsRef = ref(db, 'meals/' + day);
    push(mealsRef, {
      mealName,
      recipe,
      mealType
    }).then(() => {
      callback();  // Call the callback to refresh the state
    }).catch(error => {
      console.error('Error saving meal: ', error);
    });
}

export const fetchMealsForDay = (day, callback) => {
    const mealsRef = ref(db, 'meals/' + day);
    onValue(mealsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const meals = Object.values(data).map(item => item.mealName); // Map over the meals and return meal names
        callback(meals); // Execute callback with meals data
      } else {
        callback([]); // Return an empty array if no meals
      }
    }, {
      onlyOnce: true // Remove this if you want to listen to real-time changes
    });
  };
  
  