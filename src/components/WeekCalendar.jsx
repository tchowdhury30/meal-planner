import React from 'react';
import DayCard from './DayCard';
import '../styles/DayCard.scss';
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// eslint-disable-next-line react/prop-types
const WeekCalendar = ({ gotMeals, setGotMeals }) => {
  return (
    <div>
      <div className="weekly-meals-header">Weekly Meal Planner</div>
      <div className="week-calendar">
        {daysOfWeek.map(day => (
          <DayCard key={day} day={day} gotMeals={gotMeals} setGotMeals={setGotMeals} />
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
