// Import necessary hooks and services
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMealByName, updateMeal } from '../services/mealServices';
import viewIcon from '../img/view.png';
import saveIcon from '../img/add-meal.png';

import '../styles/EditMealDetails.scss';

const EditMealDetails = () => {
    const { mealName } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState({});
    const [ingredientInput, setIngredientInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');

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
            setImageUrl(mealData.imageUrl || ''); 
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
            },
            imageUrl: imageUrl 
        };

        if (imageUrl) {
            updatedMeal.imageUrl = imageUrl;
        }
        updateMeal('Any', meal.id, updatedMeal, () => {
            navigate(`/meal-details/${mealName}`);
        });
    };

    return (
        <div className="edit-meal-details-container">
            <form onSubmit={handleSave}>
                <div className="edit-header">
                <button onClick={handleView} className="edit-button">
                    <img src={viewIcon} alt="View Meal" />
                </button>
                <h1>{meal.mealName || 'No Meal Name'}</h1>
                </div>
                <div className="edit-type">
                <h2>Meal Type</h2>
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
                <div className="edit-imgURL">
                <h2>Image URL</h2>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL"
                />
                </div>
                <div className ="edit-ingredients">
                <h2>Ingredients</h2>
                <input 
                    type="text"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    placeholder="Enter ingredients separated by semicolons"
                />
                </div>
                <div className ="edit-steps">
                    <h2>Steps</h2>
                <textarea
                    value={meal.recipe ? meal.recipe.steps.join('\n') : ''}
                    onChange={(e) => setMeal({
                        ...meal,
                        recipe: { ...meal.recipe, steps: e.target.value.split('\n') }
                    })}
                />
                </div>
                <button className="submit" type="submit"><img src={saveIcon} alt="Save Meal Edits" /></button>
            </form>
        </div>
    );
};

export default EditMealDetails;
