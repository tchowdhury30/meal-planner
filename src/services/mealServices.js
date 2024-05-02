import { ref, push, onValue, set, remove } from "firebase/database";
import { db } from './firebaseConfig';

export function saveMeal({ mealName, recipe, mealType, day }, callback) {
  let mealsRef;
  if (!day) {
    mealsRef = ref(db, 'meals/' + "Any");
  } else {
    mealsRef = ref(db, 'meals/' + day);
  }
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
  

  export const fetchMeals = (callback) => {
    const mealsRef = ref(db, 'meals/');
    onValue(mealsRef, (snapshot) => {
      const data = snapshot.val();
      const meals = data ? Object.entries(data).flatMap(([dayKey, dayMeals]) => {
        return Object.entries(dayMeals).map(([mealKey, mealValue]) => {
          return { id: mealKey, dayId: dayKey, ...mealValue };
        });
      }) : [];
    //   console.log('Meals fetched:', meals);
      callback(meals);
    });
  };
  
  export const fetchMealsFromAny = (callback) => {
    const mealsRef = ref(db, 'meals/Any');
    onValue(mealsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const meals = Object.values(data).map((meal, index) => ({
          id: Object.keys(data)[index],
          ...meal
        }));
        callback(meals);  
      } else {
        callback([]);  
      }
    }, {
      onlyOnce: true
    });
};

  export const fetchMealById = (mealId, callback) => {
    const mealRef = ref(db, `meals/Any/${mealId}`);
    onValue(mealRef, (snapshot) => {
        const mealData = snapshot.val();
        if (mealData) {
            callback(mealData);
        } else {
            console.error("No meal found with ID:", mealId);
            callback(null); 
        }
    }, {
        onlyOnce: true
    });
};