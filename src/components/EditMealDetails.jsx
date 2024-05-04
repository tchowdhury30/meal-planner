// Import necessary hooks and services
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMealByName, updateMeal } from '../services/mealServices';
import viewIcon from '../img/view.png';
import '../styles/EditMealDetails.scss';

const EditMealDetails = () => {
    const { mealName } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState({});
    const [ingredientInput, setIngredientInput] = useState('');

    const handleView = () => {
        navigate(`/meal-details/${mealName}`);
    };

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
        <div className="edit-meal-details-container">
            <form onSubmit={handleSave}>
                <div className="edit-header">
                <h1>{meal.mealName || 'No Meal Name'}</h1>
                <button onClick={handleView} className="edit-button">
                    <img src={viewIcon} alt="View Meal" />
                </button>
                </div>
                <div className="edit-type">
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
                </div>
                <div className ="edit-ingredients">
                <input 
                    type="text"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    placeholder="Enter ingredients separated by semicolons"
                />
                </div>
                <div className ="edit-steps">
                <textarea
                    value={meal.recipe ? meal.recipe.steps.join('\n') : ''}
                    onChange={(e) => setMeal({
                        ...meal,
                        recipe: { ...meal.recipe, steps: e.target.value.split('\n') }
                    })}
                />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditMealDetails;
