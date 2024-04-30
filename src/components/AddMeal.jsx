import React from 'react';
import PropTypes from 'prop-types';
import useMealStore from '../services/useMealstore';
import Recipe from './Recipe';
import { saveMeal } from '../services/datastore';

// eslint-disable-next-line react/prop-types
const AddMeal = ({ day, closeForm, gotMeals, setGotMeals}) => {
  const {
    mealName,
    setMealName,
    mealType,
    setMealType,
    recipeDetails,
    resetMealCreation
  } = useMealStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMeal({ mealName, recipe: recipeDetails, mealType, day }, () => {
      console.log(`Meal added: ${mealName}, Type: ${mealType}, Recipe: ${JSON.stringify(recipeDetails)}, on ${day}`);
      resetMealCreation();
      closeForm();
    });
    setGotMeals(gotMeals + 1)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={mealName}
        onChange={(e) => setMealName(e.target.value)}
        placeholder="Meal Name"
        required
      />
      <select value={mealType} onChange={(e) => setMealType(e.target.value)} required>
        <option value="">Select Meal Type</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
      </select>
      <Recipe />
      <button type="submit">Add Meal</button>
      <button type="button" onClick={closeForm}>Cancel</button>
    </form>
  );
};

AddMeal.propTypes = {
  day: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired
};

export default AddMeal;