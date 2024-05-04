import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MealPlanner from './components/MealPlanner';
import Pantry from './components/Pantry';
import MealsList from './components/MealsList';
import MealDetails from './components/MealDetails';
import EditMealDetails from './components/EditMealDetails';
import mealPlannerIcon from './img/plan-nav.png';
import pantryIcon from './img/pantry-nav.png';
import mealsListIcon from './img/meal-nav.png';
import './styles/App.scss';

function App() {
  const [gotMeals, setGotMeals] = useState(0);

  useEffect(() => {}, [gotMeals]);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link className="nav-link" to="/">
            <img src={mealPlannerIcon} alt="Meal Planner" />
            <span>plan</span>
          </Link>
          <Link className="nav-link" to="/pantry">
            <img src={pantryIcon} alt="Pantry" />
            <span>pantry</span>
          </Link>
          <Link className="nav-link" to="/meals-list">
            <img src={mealsListIcon} alt="Meals List" />
            <span>recipies</span>
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<MealPlanner gotMeals={gotMeals} setGotMeals={setGotMeals}/>} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/meals-list" element={<MealsList gotMeals={gotMeals} setGotMeals={setGotMeals} />} />
          <Route path="/meal-details/:mealName" element={<MealDetails />} />
          <Route path="/meal-details/:mealName/edit" element={<EditMealDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
