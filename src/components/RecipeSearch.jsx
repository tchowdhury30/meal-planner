import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMealStore from '../services/useMealstore';
import { fetchTopIngredientsRecipes } from '../services/pantryServices';

const RecipeSearch = ({ setMeals, closeSearch }) => {
  const { pantryItems, fetchRecipesBasedOnPantry, isLoading, error, setRecipes } = useMealStore();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (pantryItems.length > 0) {
      fetchRecipesBasedOnPantry().then(recipes => {
        if (recipes.length > 0) {
          setSelectedRecipe(recipes[0]);
        } else {
          console.log("No direct matches, trying top ingredients...");
          fetchTopIngredientsRecipes(pantryItems).then(fallbackRecipes => {
            if (fallbackRecipes.length > 0) {
              setSelectedRecipe(fallbackRecipes[0]);
              setRecipes(fallbackRecipes); 
            } else {
              console.log("No recipes found with top ingredients.");
              setSelectedRecipe(null);
            }
          }).catch(err => console.error("Error fetching recipes with top ingredients:", err));
        }
      }).catch(err => console.error("Error fetching recipes based on pantry:", err));
    }
  }, [pantryItems, fetchRecipesBasedOnPantry, setRecipes]);

  const handleAddRecipeToDay = () => {
    if (selectedRecipe) {
      setMeals(meals => [...meals, {mealName: selectedRecipe.title, recipe: selectedRecipe}]);
      closeSearch();
    }
  };

  return (
    <div>
      <h1>Recipes Based on Your Pantry</h1>
      {isLoading && <p>Loading recipes...</p>}
      {error && <p>Error fetching recipes: {error}</p>}
      {selectedRecipe ? (
        <div>
          <p>{selectedRecipe.title}</p>
          <button onClick={handleAddRecipeToDay}>Add This Meal to Day</button>
        </div>
      ) : (
        <p>No recipes found. Try adding more items to your pantry.</p>
      )}
    </div>
  );
};

RecipeSearch.propTypes = {
  setMeals: PropTypes.func.isRequired,
  closeSearch: PropTypes.func.isRequired
};

export default RecipeSearch;
