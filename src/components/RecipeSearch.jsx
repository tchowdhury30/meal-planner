import React, { useEffect } from 'react';
import useMealStore from '../services/useMealstore'; 

const RecipeSearch = () => {
  const { pantryItems, recipes, fetchRecipesBasedOnPantry, isLoading, error } = useMealStore();

  useEffect(() => {
    if (pantryItems.length > 0) {
      fetchRecipesBasedOnPantry();
    }
  }, [pantryItems]);

  return (
    <div>
      <h1>Recipes Based on Your Pantry</h1>
      {isLoading && <p>Loading recipes...</p>}
      {error && <p>Error fetching recipes: {error}</p>}
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSearch;
