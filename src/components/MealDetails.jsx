import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealByName } from '../services/mealServices';
import '../styles/MealDetails.scss';

const MealDetails = () => {
    const { mealName } = useParams();
    const [meal, setMeal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const decodedMealName = decodeURIComponent(mealName);
        fetchMealByName(decodedMealName, (mealData, err) => {
            setIsLoading(false);
            if (err) {
                setError('Failed to fetch meal details');
            } else {
                setMeal(mealData);
            }
        });
    }, [mealName]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="meal-details-container">
            {meal ? (
                <div>
                    <div className="meal-header">
                        <h1 className="meal-title">{meal.mealName}</h1>
                        <h2 className="meal-type">Type: {meal.mealType || 'No type specified'}</h2>
                    </div>
                    {meal.recipe ? (
                        <div className="recipe-content">
                            {meal.recipe.ingredients && meal.recipe.ingredients.length > 0 ? (
                                <div className="ingredients">
                                    <h4>Ingredients</h4>
                                    <ul className="ingredient-list">
                                        {meal.recipe.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient.name} - {ingredient.amount} {ingredient.unit}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : <p>No ingredients listed.</p>}
                            {meal.recipe.steps && meal.recipe.steps.length > 0 ? (
                                <div className="steps">
                                    <h4>Steps</h4>
                                    <ol className="step-list">
                                        {meal.recipe.steps.map((step, index) => (
                                            <li key={index}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            ) : <p>No cooking steps provided.</p>}
                        </div>
                    ) : <p>No recipe details available.</p>}
                </div>
            ) : <p>Meal not found.</p>}
        </div>
    );
};

export default MealDetails;
