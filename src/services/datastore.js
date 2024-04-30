// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, set, remove } from "firebase/database";

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
const db = getDatabase(app);  

export function saveMeal({ mealName, recipe, mealType, day }, callback) {
    const mealsRef = ref(db, 'meals/' + day);
    push(mealsRef, {
      mealName,
      recipe,
      mealType
    }).then(() => {
      callback();   
    }).catch(error => {
      console.error('Error saving meal: ', error);
    });
}

export const fetchMealsForDay = (day, callback) => {
    const mealsRef = ref(db, 'meals/' + day);
    onValue(mealsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const meals = Object.values(data).map(item => item.mealName);  
        callback(meals);  
      } else {
        callback([]);  
      }
    }, {
      onlyOnce: true
    });
  };
  
  export const fetchPantryItems = (callback) => {
    const pantryRef = ref(db, 'pantryItems/');
    onValue(pantryRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Fetch Pantry Items:', data);  
      const pantryItems = data ? Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value
      })) : [];
      callback(pantryItems);
    });
  };

  export const fetchRecipesByIngredients = async (ingredients) => {
    const apiKey = 'dd96b00c6aa94d3dbb2fc50f9b41b009';
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch recipes');
    return response.json();
  };
  
  export const addPantryItem = (item, callback) => {
    const pantryRef = ref(db, 'pantryItems/');
    push(pantryRef, item).then(() => {
      console.log('Added Pantry Item:', item);  
      callback();
    }).catch(error => {
      console.error('Error adding pantry item:', error);
    });
  };
  
  export const updatePantryItem = (itemId, itemData, callback) => {
    const itemRef = ref(db, `pantryItems/${itemId}`);
    set(itemRef, itemData).then(() => {
      console.log('Updated Pantry Item:', itemId, itemData); 
      callback();
    }).catch(error => {
      console.error('Error updating pantry item:', error);
    });
  };
  
  export const removePantryItem = (itemId, callback) => {
    const itemRef = ref(db, `pantryItems/${itemId}`);
    remove(itemRef).then(() => {
      console.log('Removed Pantry Item:', itemId);  
      callback();
    }).catch(error => {
      console.error('Error removing pantry item:', error);
    });
  };
  
  export const fetchMeals = (callback) => {
    const mealsRef = ref(db, 'meals/');
    onValue(mealsRef, (snapshot) => {
      const data = snapshot.val();
      const meals = data ? Object.entries(data).flatMap(([dayKey, dayMeals]) => {
        return Object.entries(dayMeals).map(([mealKey, mealValue]) => {
          return { id: mealKey, dayId: dayKey, ...mealValue };
        });
      }) : [];
      console.log('Meals fetched:', meals);
      callback(meals);
    });
  };
  
  
  export const updateMeal = (dayId, mealId, mealData, callback) => {
    const mealRef = ref(db, `meals/${dayId}/${mealId}`);
    return set(mealRef, mealData)  
      .then(() => {
        console.log('Meal updated successfully');
        if (callback) callback();
      })
      .catch(error => {
        console.error('Error updating meal:', error);
        throw error; 
      });
  };  
  
  export const removeMeal = (dayId, mealId, callback) => {
    const mealRef = ref(db, `meals/${dayId}/${mealId}`);
    return remove(mealRef).then(() => {
      console.log('Meal successfully deleted:', mealId, dayId);
      callback();
    }).catch(error => {
      console.error('Error removing meal:', mealId, error);
      throw error;
    });
  };
  