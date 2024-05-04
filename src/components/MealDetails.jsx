import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMealByName } from '../services/mealServices';
import '../styles/MealDetails.scss';
import editIcon from '../img/edit.png';

const MealDetails = () => {
    const { mealName } = useParams();
    const [meal, setMeal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/meal-details/${mealName}/edit`);
    };
    
    useEffect(() => {<button onClick={handleEdit}>Edit</button>
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
                        <h2 className="meal-type">{meal.mealType || ''}</h2>
                        <button onClick={handleEdit} className="edit-button">
                            <img src={editIcon} alt="Edit Meal" />
                        </button>
                        {meal.imageUrl && (
                        <img src={meal.imageUrl} alt={meal.mealName} className="meal-image-big" />
                    )}
                    </div>
                    <div className="recipe-content">
                        {meal.recipe && meal.recipe.ingredients && (
                            <div className="ingredients">
                                <h4>Ingredients</h4>
                                <ul className="ingredient-list">
                                    {meal.recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {meal.recipe && meal.recipe.steps && (
                            <div className="steps">
                                <h4>Steps</h4>
                                <ol className="step-list">
                                    {meal.recipe.steps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>
                </div>
            ) : <p>Meal not found.</p>}
        </div>
    );
};

export default MealDetails;
