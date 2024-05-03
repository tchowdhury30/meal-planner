import React from 'react';
import PropTypes from 'prop-types';
import useMealStore from '../services/useMealstore';
import Recipe from './Recipe';
import { saveMeal } from '../services/mealServices'; 
import addMealIcon from '../img/add-meal.png';
import '../styles/MealsList.scss';

const AddMeal = ({ day, closeForm, gotMeals, setGotMeals }) => {
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
    // Use day prop directly since it will default to "Any" if not provided
    saveMeal({ mealName, recipe: recipeDetails, mealType, day }, () => {
      console.log(`Meal added: ${mealName}, Type: ${mealType}, Recipe: ${JSON.stringify(recipeDetails)}, on ${day}`);
      resetMealCreation();
      closeForm();
      setGotMeals(gotMeals + 1);
    });
  };

  return (
    <div className='add-meal-form'>
      <form onSubmit={handleSubmit}>
        <input type="text" value={mealName} onChange={e => setMealName(e.target.value)} placeholder="Meal Name" required />
        <select value={mealType} onChange={e => setMealType(e.target.value)} required>
          <option value="">Select Meal Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
        <Recipe />
        <button type="submit" className='add-meal-icon'> <img src={addMealIcon} alt="Add Meal" /> </button>
      </form>
    </div>
  );
};

// Define PropTypes
AddMeal.propTypes = {
  day: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
  gotMeals: PropTypes.number.isRequired,
  setGotMeals: PropTypes.func.isRequired
};

// Set default props
AddMeal.defaultProps = {
  day: 'Any'
};

export default AddMeal;
