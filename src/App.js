import './App.css';
import React from 'react';
import MealPlanner from './components/MealPlanner'; 
import Pantry from './components/Pantry';
import MealsManager from './components/MealsManager';

function App() {
  return (
    <div className="App">
      <MealPlanner />
      <Pantry />
      <MealsManager />
    </div>
  );
}

export default App;
