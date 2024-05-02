import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealByName } from '../services/mealServices';

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
        <div>
            {meal ? (
                <div>
                    <h1>{meal.mealName}</h1>
                    <h2>Type: {meal.mealType}</h2>
                    <div>
                        <h3>Recipe</h3>
                        {meal.recipe ? (
                            <div>
                                <h4>Ingredients</h4>
                                <ul>
                                    {meal.recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient.name} - {ingredient.amount} {ingredient.unit}</li>
                                    ))}
                                </ul>
                                <h4>Steps</h4>
                                <ol>
                                    {meal.recipe.steps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
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
