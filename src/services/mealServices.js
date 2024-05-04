import { ref, push, onValue, set, remove } from "firebase/database";
import { db } from './firebaseConfig';

export function saveMeal({ mealName, recipe, mealType, day, imageUrl = '' }, callback) {
  let mealsRef;
  if (!day) {
    mealsRef = ref(db, 'meals/' + "Any");
  } else {
    mealsRef = ref(db, 'meals/' + day);
  }
    push(mealsRef, {
      mealName,
      recipe,
      mealType,
      imageUrl
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
    const mealsRef = ref(db, 'meals/Any');
    onValue(mealsRef, (snapshot) => {
      const data = snapshot.val();
      const meals = data ? Object.entries(data).map(([mealKey, mealValue]) => {
        return { id: mealKey, ...mealValue };
      }) : [];
      // console.log('Meals fetched:', meals);
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

export const removeMealByName = (day, mealName, callback) => {
  const mealsRef = ref(db, `meals/${day}`);

  // Fetch all meals for the given day
  onValue(mealsRef, (snapshot) => {
      const mealsData = snapshot.val();

      if (mealsData) {
          const meals = Object.entries(mealsData).map(([key, value]) => ({
              id: key,
              ...value
          }));

          const mealToRemove = meals.find(meal => meal.mealName === mealName);

          if (mealToRemove) {
              const mealRef = ref(db, `meals/${day}/${mealToRemove.id}`);
              remove(mealRef).then(() => {
                  console.log("Meal successfully deleted:", mealToRemove.mealName, day);
                  callback(true); 
              }).catch(error => {
                  console.error("Error removing meal:", error);
                  callback(false, error); 
              });
          } else {
              console.log("No meal found with the name:", mealName);
              callback(false); 
          }
      } else {
          console.log("No meals found on the day:", day);
          callback(false); 
      }
  }, {
      onlyOnce: true
  });
};

export const fetchMealByName = (mealName, callback) => {
  const mealsRef = ref(db, 'meals/Any'); 
  onValue(mealsRef, (snapshot) => {
      const mealsData = snapshot.val();
      let found = false;
      if (mealsData) {
          Object.entries(mealsData).forEach(([key, value]) => {
              if (value.mealName.toLowerCase() === mealName.toLowerCase()) {
                  callback({ id: key, ...value }, null);
                  found = true;
              }
          });
          if (!found) {
              console.error("No meal found with the name:", mealName);
              callback(null, "No meal found with the name: " + mealName);
          }
      } else {
          console.error("No meals found");
          callback(null, "No meals found");
      }
  }, {
      onlyOnce: true
  });
};
