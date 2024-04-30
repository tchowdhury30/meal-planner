import './App.css';
import React, { useState } from 'react';
import MealPlanner from './components/MealPlanner'; 
import Pantry from './components/Pantry';
 import MealsList from './components/MealsList';
import { useEffect } from 'react';

function App() {
  const [gotMeals, setGotMeals] = useState(0);
  useEffect(() => {
  }, [gotMeals]);

  return (
    <div className="App">
      <MealPlanner gotMeals={gotMeals} setGotMeals={setGotMeals}/>
      <Pantry />
      <MealsList gotMeals={gotMeals} setGotMeals={setGotMeals}/> 
    </div>
  );
}

export default App;
