import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MealPlanner from './components/MealPlanner';
import Pantry from './components/Pantry';
import MealsList from './components/MealsList';
import MealDetails from './components/MealDetails';
import './App.css';

function App() {
  const [gotMeals, setGotMeals] = useState(0);
  useEffect(() => {
  }, [gotMeals]);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link className="nav-link" to="/">Weekly Meal Planner</Link>
          <Link className="nav-link" to="/pantry">My Pantry</Link>
          <Link className="nav-link" to="/meals-list">Meals List</Link>
        </nav>
        <Routes>
          <Route path="/" element={<MealPlanner gotMeals={gotMeals} setGotMeals={setGotMeals}/>} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/meals-list" element={<MealsList gotMeals={gotMeals} setGotMeals={setGotMeals} />} />
          <Route path="/meal-details/:mealName" element={<MealDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
