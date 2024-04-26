import React, { useState, useEffect } from 'react';
import { fetchMeals, updateMeal, removeMeal } from '../services/datastore';

const MealsManager = () => {
  const [meals, setMeals] = useState([]);
  const [editForms, setEditForms] = useState({});

  useEffect(() => {
    fetchMeals((fetchedMeals) => {
      setMeals(fetchedMeals);
      // Set initial state for editForms
      const initialEditForms = fetchedMeals.reduce((acc, meal) => ({
        ...acc,
        [meal.id]: { name: meal.name, description: meal.description }
      }), {});
      setEditForms(initialEditForms);
    });
  }, []);

  const handleEditChange = (mealId, field, value) => {
    setEditForms((prevEditForms) => ({
      ...prevEditForms,
      [mealId]: { ...prevEditForms[mealId], [field]: value }
    }));
  };

  const handleUpdate = (mealId) => {
    const mealData = editForms[mealId];
    if (mealData) {
      updateMeal(mealId, mealData, () => {
        fetchMeals((fetchedMeals) => {
          setMeals(fetchedMeals);
        });
      });
    }
  };

  const handleRemove = (mealId) => {
    removeMeal(mealId, () => {
      fetchMeals((fetchedMeals) => {
        setMeals(fetchedMeals);
        setEditForms((prevEditForms) => {
            const newEditForms = { ...prevEditForms };
            delete newEditForms[mealId];
            return newEditForms;
          });                      
      });
    });
  };

  return (
    <div>
      <h2>Manage Meals</h2>
      {meals.map((meal) => (
        <div key={meal.id}>
          <input
            type="text"
            value={editForms[meal.id]?.name || ''}
            onChange={(e) => handleEditChange(meal.id, 'name', e.target.value)}
          />
          <textarea
            value={editForms[meal.id]?.description || ''}
            onChange={(e) => handleEditChange(meal.id, 'description', e.target.value)}
          />
          <button onClick={() => handleUpdate(meal.id)}>Update</button>
          <button onClick={() => handleRemove(meal.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default MealsManager;
