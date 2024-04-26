import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddMealForm from './AddMeal';
import { fetchMealsForDay } from '../services/datastore';

const DayCard = ({ day }) => {
  const [showForm, setShowForm] = useState(false);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMealsForDay(day, setMeals); 
  }, [day]);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div style={{ margin: '10px', padding: '20px', border: '1px solid gray', cursor: 'pointer' }}>
      <h4>{day}</h4>
      <button onClick={handleToggleForm}>{showForm ? 'Cancel' : 'Add Meal'}</button>
      {showForm && <AddMealForm day={day} closeForm={() => setShowForm(false)} />}
      {!showForm && (
        <div>
          <ul>
            {meals.map((meal, index) => <li key={index}>{meal}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired
};

export default DayCard;
