import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useMealStore from '../services/useMealstore';
import { saveMeal } from '../services/mealServices'; 
import { fetchPantryItems } from '../services/pantryServices';


const RecipeSearch = ({ closeSearch }) => {
  const { recipes, pantryItems, fetchRecipesBasedOnPantry, isLoading, fetchRecipeDetails } = useMealStore();

  useEffect(() => {
    if (pantryItems.length === 0) {
      fetchPantryItems((pantryItems) => {
        fetchRecipesBasedOnPantry(pantryItems);
      });
    } else {
      fetchRecipesBasedOnPantry(pantryItems);
      
    }
  }, [pantryItems]);

  const handleRecipeClick = async (recipeId) => {
    const recipe = recipes.find(r => r.id === recipeId); 
    console.log('details:', recipe);
    if (recipe) {
        await fetchRecipeDetails(recipeId); 
        const updatedDetails = useMealStore.getState().recipeDetails;

        if (updatedDetails) {
          const ingredients = [];
          const steps = [];
    
          updatedDetails.forEach((section) => {
            section.steps.forEach((step) => {
              steps.push(step.step);
    
              step.ingredients.forEach((ingredient) => {
                ingredients.push({
                  name: ingredient.name,
                  image: ingredient.image,
                  id: ingredient.id
                });
              });
            });
          });   
          console.log("myingredients", ingredients);
          console.log("mysteps", steps);

          const newRecipe = {
            title: recipe.title,
            steps: steps,
            ingredients: ingredients,
            type: ''
          };

          saveMeal({
            mealName: recipe.title,
            recipe: newRecipe,
            mealType: newRecipe.type, 
            day: 'Any', 
          }, () => {
            console.log('Meal saved successfully');
          });
        } 

    }
    closeSearch();
};

  return (
    <div>
        <h1>Recipes Based on Your Pantry</h1>
        {isLoading && <p>Loading recipes...</p>}
        <ul>
            {recipes.map((recipe) => (
                <li key={recipe.id} onClick={() => handleRecipeClick(recipe.id)}>
                    {recipe.title}
                </li>
            ))}
        </ul>
    </div>
);
};

RecipeSearch.propTypes = {
  closeSearch: PropTypes.func.isRequired,
};

export default RecipeSearch;