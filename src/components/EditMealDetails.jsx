// Import necessary hooks and services
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMealByName, updateMeal } from '../services/mealServices';

const EditMealDetails = () => {
    const { mealName } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState({});

    useEffect(() => {
        fetchMealByName(decodeURIComponent(mealName), (mealData) => {
            setMeal(mealData);
        });
    }, [mealName]);

    const handleSave = (e) => {
        e.preventDefault();
        updateMeal('Any', meal.id, meal, () => {  // Assuming you're updating in 'Any' day section
            navigate(`/meal-details/${mealName}`);
        });
    };

    return (
        <form onSubmit={handleSave}>
            <input
                type="text"
                value={meal.mealName || ''}
                onChange={(e) => setMeal({ ...meal, mealName: e.target.value })}
            />
            <textarea
                value={meal.recipe ? meal.recipe.steps.join('\n') : ''}
                onChange={(e) => setMeal({
                    ...meal,
                    recipe: { ...meal.recipe, steps: e.target.value.split('\n') }
                })}
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default EditMealDetails;
