import React, {useEffect} from 'react';
import WeekCalendar from './WeekCalendar';

// eslint-disable-next-line react/prop-types
const MealPlanner = ({gotMeals, setGotMeals}) => {
  useEffect(() => {
    // console.log("Got Meals from meal planner", gotMeals)
  }, [gotMeals]);

  return (
    <div>
      {/* <h1>Weekly Meal Planner</h1> */}
      <WeekCalendar gotMeals={gotMeals} setGotMeals={setGotMeals}/>
    </div>
  );
};

export default MealPlanner;
