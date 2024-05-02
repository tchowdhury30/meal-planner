import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMealsForDay, saveMeal, fetchMeals, fetchMealById } from '../services/mealServices';

const DayCard = ({ day, gotMeals, setGotMeals }) => {
    const [meals, setMeals] = useState([]);
    const [allMeals, setAllMeals] = useState([]);
    const [selectedMealId, setSelectedMealId] = useState('');
    const [showMealSelector, setShowMealSelector] = useState(false);

    useEffect(() => {
        fetchMealsForDay(day, setMeals);   
        fetchMeals(setAllMeals);          
    }, [day, gotMeals]);



// export function saveMeal({ mealName, recipe, mealType, day }, callback) {
//     let mealsRef;
//     if (!day) {
//       mealsRef = ref(db, 'meals/' + "Any");
//     } else {
//       mealsRef = ref(db, 'meals/' + day);
//     }


    // const handleAddMeal = () => {
    //     if (selectedMealId) {
    //       console.log("hello", selectedMealId);
          
    //       saveMeal({ mealId: selectedMealId, day }, () => {
    //             console.log(`Meal added to ${day}`);
    //             fetchMealsForDay(day, setMeals);  
    //             setSelectedMealId('');            
    //             setGotMeals(gotMeals + 1);        
    //         });
    //     }
    // };

    const handleAddMeal = () => {
        if (selectedMealId) {
            fetchMealById(selectedMealId, (mealData) => {
                console.log("he", mealData);
                if (mealData) {
                    saveMeal({
                        mealName: mealData.mealName,
                        recipe: mealData.recipe,  
                        mealType: mealData.mealType,
                        day
                    }, () => {
                        console.log(`Meal added to ${day}`);
                        fetchMealsForDay(day, setMeals);  
                        setSelectedMealId('');            
                        setGotMeals(gotMeals + 1);        
                    });
                } else {
                    console.error("Failed to fetch meal details for ID:", selectedMealId);
                }
            });
        } else {
            console.log("No meal selected");
            // Optionally handle the case where no meal ID is selected
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
