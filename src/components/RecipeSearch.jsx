import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMealStore from '../services/useMealstore';
import { fetchTopIngredientsRecipes, fetchPantryItems } from '../services/pantryServices';


const RecipeSearch = ({ setMeals, closeSearch }) => {
  const { pantryItems, fetchRecipesBasedOnPantry, isLoading, error, setRecipes } = useMealStore();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (pantryItems.length === 0) { 
      fetchPantryItems((pantryItems) => {
        fetchRecipesBasedOnPantry(pantryItems).then(data => {
          const { recipe, recipeDetails } = data;
          // console.log("Recipe:", recipe);
          // console.log("Recipe details:", recipeDetails);
          if (recipe && recipe.id > 0) {
            // console.log("Direct matches found");
            setSelectedRecipe(recipe);
            parseAndSetRecipeDetails(recipeDetails);
          } else {
            console.log("No direct matches, trying top ingredients...");
            fetchTopIngredientsRecipes(pantryItems).then(fallbackRecipes => {
              console.log("Fallback recipes fetched:", fallbackRecipes);
              if (fallbackRecipes.length > 0) {
                console.log("Fallback recipes found");
                setSelectedRecipe(fallbackRecipes[0]);
                setRecipes(fallbackRecipes); 
              } else {
                console.log("No recipes found with top ingredients.");
                setSelectedRecipe(null);
              }
            }).catch(err => console.error("Error fetching recipes with top ingredients:", err));
          }
        }).catch(err => console.error("Error fetching recipes based on pantry:", err));
      });
    } else {
      console.log("Pantry items are present");
      fetchRecipesBasedOnPantry().then(recipe => {
        console.log("Recipes fetched based on pantry:", recipe);
        if (recipe.id) {
          console.log("Direct matches found");
          setSelectedRecipe(recipe);
        } else {
          console.log("No direct matches, trying top ingredients...");
          fetchTopIngredientsRecipes(pantryItems).then(fallbackRecipes => {
            console.log("Fallback recipes fetched:", fallbackRecipes);
            if (fallbackRecipes.length > 0) {
              console.log("Fallback recipes found");
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
    console.log("Adding selected recipe to day:", selectedRecipe);
  
    if (selectedRecipe) {
      parseAndSetRecipeDetails(selectedRecipe.steps);
  
      setMeals(meals => [...meals, { mealName: selectedRecipe.title, recipe: selectedRecipe }]);
      closeSearch();
    }
  };
  

  const parseAndSetRecipeDetails = (recipeData) => {
    const { setRecipeDetails } = useMealStore.getState(); // Get state function instead of using hook directly
  
    const ingredients = [];
    const steps = [];
  
    recipeData.forEach((section) => {
      section.steps.forEach((step) => {
        // Adding step descriptions
        steps.push(step.step);
  
        // Extracting ingredients
        step.ingredients.forEach((ingredient) => {
          ingredients.push({
            name: ingredient.name,
            image: ingredient.image,
            id: ingredient.id
          });
        });
      });
    });
  
    // Setting parsed data in the store
    setRecipeDetails({ ingredients, steps });
    console.log("hahahahah", ingredients, steps);
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