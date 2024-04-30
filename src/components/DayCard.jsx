import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddMealForm from './AddMeal';
import RecipeSearch from './RecipeSearch';
import { fetchMealsForDay } from '../services/mealServices';   
import useMealStore from '../services/useMealstore';

const DayCard = ({ day, gotMeals, setGotMeals }) => {
  const [showForm, setShowForm] = useState(false);
  const [meals, setMeals] = useState([]);
  const [viewRecipeSearch, setViewRecipeSearch] = useState(false);
  const { pantryItems } = useMealStore(); 

  useEffect(() => {
    fetchMealsForDay(day, setMeals);   
  }, [day, gotMeals]);

  const handleAddMeal = () => {
    setShowForm(!showForm);
    setViewRecipeSearch(false);
  };

  const handleShowRecipeSearch = () => {
    setShowForm(false);
    setViewRecipeSearch(!viewRecipeSearch);
  };

  return (
    <div style={{ margin: '10px', padding: '20px', border: '1px solid gray', cursor: 'pointer' }}>
      <h4>{day}</h4>
      <button onClick={handleAddMeal}>{showForm ? 'Cancel' : 'Add Meal'}</button>
      <button onClick={handleShowRecipeSearch}>{viewRecipeSearch ? 'Hide Suggestions' : 'Show Suggestions'}</button>
      {showForm && <AddMealForm day={day} closeForm={() => setShowForm(false)} gotMeals={gotMeals} setGotMeals={setGotMeals} />}
      {viewRecipeSearch && <RecipeSearch setMeals={setMeals} closeSearch={() => setViewRecipeSearch(false)} pantryItems={pantryItems} />} 
      {!showForm && !viewRecipeSearch && (
        <ul>
          {meals.map((meal, index) => <li key={index}>{meal}</li>)}
        </ul>
      )}
    </div>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  gotMeals: PropTypes.number,
  setGotMeals: PropTypes.func.isRequired
};

export default DayCard;
