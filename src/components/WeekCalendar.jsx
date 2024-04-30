import React from 'react';
import DayCard from './DayCard';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// eslint-disable-next-line react/prop-types
const WeekCalendar = ({gotMeals, setGotMeals}) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {daysOfWeek.map(day => (
        <DayCard key={day} day={day} gotMeals={gotMeals} setGotMeals={setGotMeals}/>
      ))}
    </div>
  );
};

export default WeekCalendar;
