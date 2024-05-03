// Import necessary hooks and services
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMealByName, updateMeal } from '../services/mealServices';

const EditMealDetails = () => {
    const { mealName } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState({});
    const [ingredientInput, setIngredientInput] = useState('');


    useEffect(() => {
        fetchMealByName(decodeURIComponent(mealName), (mealData) => {
            setMeal(mealData);
            if (mealData.recipe && mealData.recipe.ingredients) {
                const ingredientString = mealData.recipe.ingredients.map(ing => ing.name).join('; ');
                setIngredientInput(ingredientString);
            }
        });
    }, [mealName]);

    const handleSave = (e) => {
        e.preventDefault();
        const ingredientsArray = ingredientInput.split(';').map(name => ({ name: name.trim() }));
        const updatedMeal = {
            ...meal,
            recipe: {
                ...meal.recipe,
                ingredients: ingredientsArray
            }
        };
        updateMeal('Any', meal.id, updatedMeal, () => {
            navigate(`/meal-details/${mealName}`);
        });
    };

    return (
        <form onSubmit={handleSave}>
            <h1>{meal.mealName || 'No Meal Name'}</h1>
            <select 
                value={meal.mealType || ''} 
                onChange={(e) => setMeal({ ...meal, mealType: e.target.value })}
            >
                <option value="">Select Meal Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
            </select>
            <input 
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                placeholder="Enter ingredients separated by semicolons"
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
