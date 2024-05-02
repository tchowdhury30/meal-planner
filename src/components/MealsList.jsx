import React, { useEffect, useState } from 'react';
import useMealStore from '../services/useMealstore';
import { removeMeal } from '../services/mealServices';
import AddMealForm from './AddMeal';

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

  const [showAddMealForm, setShowAddMealForm] = useState(false);

  useEffect(() => {
    fetchMealList();
    setGotMeals(gotMeals + 1)
  }, [fetchMealList]);

  const toggleAddMealForm = () => setShowAddMealForm(!showAddMealForm);

  const handleRemoveMeal = (dayId, mealId) => {
    removeMeal('any', mealId, () => {
    });
  };

  return (
    <div>
      <h2>Meals List</h2>
      <button onClick={toggleAddMealForm}>
        {showAddMealForm ? 'Cancel Add Meal' : 'Add Meal'}
      </button>
      {showAddMealForm && <AddMealForm closeForm={() => setShowAddMealForm(false)} gotMeals={gotMeals} setGotMeals={setGotMeals} />}
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
              <button type="button" onClick={() => handleRemoveMeal('any', meal.id)}>Remove</button> 
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MealsList;
