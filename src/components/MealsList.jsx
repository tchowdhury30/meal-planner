import React, { useEffect, useState } from 'react';
import useMealStore from '../services/useMealstore';
import { removeMeal, fetchMealsFromAny } from '../services/mealServices';  // Import fetchMealsFromAny
import AddMealForm from './AddMeal';
import RecipeSearch from './RecipeSearch'; 

// eslint-disable-next-line react/prop-types
const MealsList = ({ gotMeals, setGotMeals }) => {
  const {
    mealList,
    setMealList,  
    editingMealId,
    editedMeal,
    clearMealEdit,
    commitMealEdit, 
    pantryItems
  } = useMealStore((state) => state);

  const [showAddMealForm, setShowAddMealForm] = useState(false);
  const [showRecipeSearch, setShowRecipeSearch] = useState(false); 

  useEffect(() => {
    fetchMealsFromAny(setMealList);
  }, [setMealList, gotMeals]);

  const toggleAddMealForm = () => setShowAddMealForm(!showAddMealForm);
  const toggleRecipeSearch = () => setShowRecipeSearch(!showRecipeSearch);

  const handleRemoveMeal = (dayId, mealId) => {
    removeMeal(dayId, mealId, () => {
      fetchMealsFromAny(setMealList); 
    });
  };

  return (
    <div>
      <h2>Meals List</h2>
      <button onClick={toggleAddMealForm}>
        {showAddMealForm ? 'Cancel Add Meal' : 'Add Meal'}
      </button>
      <button onClick={toggleRecipeSearch}>{showRecipeSearch ? 'Hide Suggestions' : 'Show Suggestions'}</button>
      {showAddMealForm && <AddMealForm closeForm={() => setShowAddMealForm(false)} gotMeals={gotMeals} setGotMeals={setGotMeals} />}
      {showRecipeSearch && <RecipeSearch closeSearch={() => setShowRecipeSearch(false)} pantryItems={pantryItems} />}
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
              <button type="button" onClick={() => handleRemoveMeal('Any', meal.id)}>Remove</button> 
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MealsList;
