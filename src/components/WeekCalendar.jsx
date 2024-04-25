import React from 'react';
import DayCard from './DayCard';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WeekCalendar = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {daysOfWeek.map(day => (
        <DayCard key={day} day={day} />
      ))}
    </div>
  );
};

export default WeekCalendar;
