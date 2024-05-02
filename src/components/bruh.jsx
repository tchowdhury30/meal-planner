import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMealsForDay, fetchAllMeals, addMealToDay } from '../services/mealServices';

const DayCard = ({ day, gotMeals }) => {
    const [meals, setMeals] = useState([]);
    const [allMeals, setAllMeals] = useState([]);
    const [selectedMealId, setSelectedMealId] = useState('');
    const [showMealSelector, setShowMealSelector] = useState(false);
    // const { pantryItems } = useMealStore(); 

    useEffect(() => {
        fetchMealsForDay(day, setMeals);   // Fetch meals for the specific day
        fetchAllMeals(setAllMeals);       // Fetch all available meals
    }, [day, gotMeals]);

    const handleAddMeal = () => {
        if (selectedMealId) {
            addMealToDay({ mealId: selectedMealId, day }, () => {
                console.log(`Meal added to ${day}`);
                // Optionally refresh the list of meals for the day
                fetchMealsForDay(day, setMeals);
                setSelectedMealId(''); // Reset selection
            });
        }
    };

    const toggleMealSelector = () => {
        setShowMealSelector(!showMealSelector);
    };

    return (
        <div style={{ margin: '10px', padding: '20px', border: '1px solid gray', cursor: 'pointer' }}>
            <h4>{day}</h4>
            <button onClick={toggleMealSelector}>{showMealSelector ? 'Cancel' : 'Add Meal'}</button>
            {showMealSelector && (
                <div>
                    <select value={selectedMealId} onChange={(e) => setSelectedMealId(e.target.value)}>
                        <option value="">Select a Meal</option>
                        {allMeals.map((meal) => (
                            <option key={meal.id} value={meal.id}>{meal.mealName}</option>
                        ))}
                    </select>
                    <button onClick={handleAddMeal}>Add Meal to Day</button>
                </div>
            )}
            <ul>
                {meals.map((meal, index) => <li key={index}>{meal}</li>)}
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
