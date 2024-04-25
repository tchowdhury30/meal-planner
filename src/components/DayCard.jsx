import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import AddMealForm from './AddMeal';

const DayCard = ({ day }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ margin: '10px', padding: '20px', border: '1px solid gray', cursor: 'pointer' }}>
      <h4 onClick={() => setShowForm(true)}>{day}</h4>
      {showForm && <AddMealForm day={day} closeForm={() => setShowForm(false)} />}
    </div>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired 
};

export default DayCard;
