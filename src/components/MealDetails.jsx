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
                        <h2 className="meal-type">Type: {meal.mealType}</h2>
                    </div>
                    <div>
                        <h3>Recipe</h3>
                        {meal.recipe ? (
                            <div>
                                <div className="ingredients">
                                    <h4>Ingredients</h4>
                                    <ul className="ingredient-list">
                                        {meal.recipe.ingredients.map((ingredient, index) => (
                                            <li className="ingredient-item" key={index}>
                                                {ingredient.name} - {ingredient.amount} {ingredient.unit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="steps">
                                    <h4>Steps</h4>
                                    <ol className="step-list">
                                        {meal.recipe.steps.map((step, index) => (
                                            <li className="step-item" key={index}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        ) : <p>No recipe details available.</p>}
                    </div>
                </div>
            ) : (
                <p>Meal not found.</p>
            )}
        </div>
    );
};

export default MealDetails;
