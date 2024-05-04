import React, { useEffect, useState } from 'react';
import useMealStore from '../services/useMealstore';
import { removeMeal, fetchMealsFromAny } from '../services/mealServices';   
import AddMealForm from './AddMeal';
import RecipeSearch from './RecipeSearch'; 
import addMealIcon from '../img/add-meal.png'; 
import deleteMealIcon from '../img/delete-meal.png';
import showSuggestions from '../img/suggestion.png'
import cancelIcon from '../img/cancel.png';
import { useNavigate } from 'react-router-dom'; 
import '../styles/MealsList.scss';

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
  const navigate = useNavigate();

  useEffect(() => {
    fetchMealsFromAny(setMealList);
  }, [setMealList, gotMeals]);

  const toggleAddMealForm = () => setShowAddMealForm(!showAddMealForm);
  const toggleRecipeSearch = () => setShowRecipeSearch(!showRecipeSearch);

  const handleRemoveMeal = (dayId, mealId) => {
    event.stopPropagation();
    removeMeal(dayId, mealId, () => {
      fetchMealsFromAny(setMealList); 
    });
  };

  const viewMealDetails = (mealName) => {
    navigate(`/meal-details/${encodeURIComponent(mealName)}`);
};

  return (
    <div className="meals-list-container">
      <div className="header-container">
        <h2>Meals List</h2>
      </div>
      <div className="button-container">
      <button onClick={toggleAddMealForm} className="add-meal-button">
        {showAddMealForm ? <img src={cancelIcon} alt="Cancel Add Meal" /> : <img src={addMealIcon} alt="Add Meal" />}
      </button>
      <button onClick={toggleRecipeSearch} className="suggestions-button"> {showRecipeSearch ? <img src={cancelIcon} alt="Hide Suggestions" /> : <img src={showSuggestions} alt="Suggestions" />}</button>
      {showAddMealForm && <AddMealForm closeForm={() => setShowAddMealForm(false)} gotMeals={gotMeals} setGotMeals={setGotMeals} />}
      {showRecipeSearch && <RecipeSearch closeSearch={() => setShowRecipeSearch(false)} pantryItems={pantryItems} />}
      </div>
      <div className="meals-list">
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
            <div className="view-meal"  onClick={() => viewMealDetails(meal.mealName)}>
              <span>{meal.mealName}</span>
              {meal.imageUrl && <img src={meal.imageUrl} alt={meal.mealName} className="meal-image" />}
              <button className="remove-meal-button" type="button" onClick={() => handleRemoveMeal('Any', meal.id)} ><img src={deleteMealIcon} alt="Delete Meal" /></button> 
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default MealsList;
