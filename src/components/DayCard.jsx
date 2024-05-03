import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMealsForDay, removeMealByName, fetchMeals, fetchMealById, saveMeal } from '../services/mealServices';
import { useNavigate } from 'react-router-dom';
import addMealIcon from '../img/add-meal.png'; 
import deleteMealIcon from '../img/delete-meal.png'; 
import cancelIcon from '../img/cancel.png';
import '../styles/DayCard.scss';

const DayCard = ({ day, gotMeals, setGotMeals }) => {
    const [meals, setMeals] = useState([]);
    const [allMeals, setAllMeals] = useState([]);
    const [selectedMealId, setSelectedMealId] = useState('');
    const [showMealSelector, setShowMealSelector] = useState(false);
    const navigate = useNavigate();  

    useEffect(() => {
        fetchMealsForDay(day, setMeals);   
        fetchMeals(setAllMeals);          
    }, [day, gotMeals]);

    const handleAddMeal = () => {
        if (selectedMealId) {
            fetchMealById(selectedMealId, (mealData) => {
                if (mealData) {
                    saveMeal({
                        mealName: mealData.mealName,
                        recipe: mealData.recipe || "",
                        mealType: mealData.mealType,
                        day: day
                    }, () => {
                        console.log(`Meal added to ${day}`);
                        fetchMealsForDay(day, setMeals);  
                        setGotMeals(gotMeals + 1);        
                    });
                } else {
                    console.error("Failed to fetch meal details for ID:", selectedMealId);
                }
            });
        }
    };

    const handleRemoveMeal = (mealName) => {
        removeMealByName(day, mealName, () => {
            console.log("hehehe", day, mealName);
            fetchMealsForDay(day, setMeals);  
            setGotMeals(gotMeals - 1);       
        });
    };

    const toggleMealSelector = () => {
        setShowMealSelector(prev => !prev);
    };

    const viewMealDetails = (mealName) => {
        navigate(`/meal-details/${encodeURIComponent(mealName)}`);
    };

    return (
        <div className="day-card">
            <div className="day-header">
                <h4>{day}</h4>
                <button onClick={toggleMealSelector} className="add-meal-button">
                    {showMealSelector ? <img src={cancelIcon} alt="Cancel Meal" /> : <img src={addMealIcon} alt="Add Meal" />}
                </button>
            </div>
            {showMealSelector && (
                <div className="meal-selector">
                    <select value={selectedMealId} onChange={(e) => setSelectedMealId(e.target.value)}>
                        <option value="">meal?</option>
                        {allMeals.map((meal) => (
                            <option key={meal.id} value={meal.id}>{meal.mealName}</option>
                        ))}
                    </select>
                    <button onClick={handleAddMeal}>Add</button>
                </div>
            )}
            <ul>
                {meals.map((mealName) => (
                    <li key={mealName} onClick={() => viewMealDetails(mealName)} className="meal-item">
                        {mealName}
                        <button onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveMeal(mealName);
                        }} className="remove-meal-button"><img src={deleteMealIcon} alt="Delete Meal" /> </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

DayCard.propTypes = {
    day: PropTypes.string.isRequired,
    gotMeals: PropTypes.number,
    setGotMeals: PropTypes.func.isRequired
};

export default DayCard;
