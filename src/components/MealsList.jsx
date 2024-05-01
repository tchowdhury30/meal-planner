import React, { useEffect } from 'react';
import useMealStore from '../services/useMealstore';
import { removeMeal } from '../services/mealServices';

// eslint-disable-next-line react/prop-types
const MealsList = ({gotMeals, setGotMeals}) => {
  const {
    mealList,   
    editingMealId,
    editedMeal,
    fetchMealList,   
    // initiateMealEdit,
    clearMealEdit,
    commitMealEdit
  } = useMealStore((state) => state);

  useEffect(() => {
    fetchMealList();
    setGotMeals(gotMeals + 1)
  }, [fetchMealList]);

  const handleRemoveMeal = (dayId, mealId) => {
    removeMeal(dayId, mealId, () => {
    });
  };

  return (
    <div>
      <h2>Meals List</h2>
      {mealList.map((meal) => (   
        <div key={meal.id}>
          {editingMealId === meal.id ? (
            <div>
            <input
              type="text"
              value={editedMeal.name}
              onChange={(e) => useMealStore.setState((state) => ({
                editedMeal: { ...state.editedMeal, name: e.target.value }
              }))}
            />
            <textarea
              value={editedMeal.description}
              onChange={(e) => useMealStore.setState((state) => ({
                editedMeal: { ...state.editedMeal, description: e.target.value }
              }))}
            />
            <button onClick={() => commitMealEdit(meal.id)}>Save</button>
            <button onClick={clearMealEdit}>Cancel</button>
          </div>
          ) : (
            <div>
              <span>{meal.mealName}</span>
              <span>{meal.description}</span>
              {/* <button type="button" onClick={() => initiateMealEdit(meal)}>Edit</button> */}
              <button type="button" onClick={() => handleRemoveMeal(meal.dayId, meal.id)}>Remove</button> 
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MealsList;