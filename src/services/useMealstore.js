import { create } from 'zustand';
import * as mealServices from './mealServices'; 
import * as pantryServices from './pantryServices'; 
import * as spoonacularAPI from './spoonacularApi';

const useMealStore = create((set, get) => ({
  mealName: '',
  mealType: '',
  recipeDetails: { ingredients: [], steps: [] },
  mealList: [],
  editingMealId: null,
  editedMeal: { name: '', description: '' },
  pantryItems: [],
  recipes: [],
  isLoading: false,
  error: null,
  

  // Meal and Pantry Functions
  setMealName: name => set({ mealName: name }),
  setMealType: type => set({ mealType: type }),
  setMealList: (meals) => set({ mealList: meals }),
  setRecipeDetails: details => set({ recipeDetails: details }),
  addIngredient: ingredient => set(state => ({
    recipeDetails: {
      ...state.recipeDetails,
      ingredients: [...state.recipeDetails.ingredients, ingredient],
    }
  })),
  addStep: step => set(state => ({
    recipeDetails: {
      ...state.recipeDetails,
      steps: [...state.recipeDetails.steps, step],
    }
  })),
  resetMealCreation: () => set({ mealName: '', mealType: '', recipeDetails: { ingredients: [], steps: [] } }),
  
  // Fetch data
  fetchMealList: () => mealServices.fetchMeals(meals => set({ mealList: meals || [] })),
  fetchPantryItems: async () => {
    set({ isLoading: true });
    try {
      const items = await pantryServices.fetchPantryItems();
      set({ pantryItems: items, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
// Recipe fetching
fetchRecipesBasedOnPantry: async (pantryItems) => {
  set({ isLoading: true });
  try {
      const ingredients = pantryItems.map(item => item.name.trim()).filter(name => name).join(",");
      if (ingredients) {
          const recipes = await spoonacularAPI.fetchRecipesByIngredients(ingredients);
          if (recipes.id != 0 ) {
              const recipeDetails = await spoonacularAPI.fetchRecipeInstructions(recipes.id);
              set({ recipes: [recipeDetails], isLoading: false });
              return { recipe: recipes, recipeDetails: recipeDetails };
          } else {
              console.error("No recipes found with given ingredients.");
              set({ recipes: [], isLoading: false });
          }
          
      } else {
          console.error("No valid ingredients to fetch recipes for.");
          set({ recipes: [], isLoading: false });
      }
      
  } catch (error) {
      console.error("Error fetching recipes:", error);
      set({ error: error.message, isLoading: false });
  }
},
  // Meal Editing
  initiateMealEdit: meal => {
    const mealToEdit = get().mealList.find(m => m.id === meal.id);
    mealToEdit ? set({
      editingMealId: meal.id,
      editedMeal: { name: mealToEdit.mealName, description: mealToEdit.description },
    }) : console.error('Meal not found for editing:', meal);
  },
  clearMealEdit: () => set({ editingMealId: null, editedMeal: { name: '', description: '' } }),
  commitMealEdit: async mealId => {
    const meal = get().mealList.find(m => m.id === mealId);
    if (!meal) {
      console.error('Meal not found for editing:', mealId);
      return;
    }
    try {
      await mealServices.updateMeal(meal.dayId, mealId, get().editedMeal);
      get().fetchMealList();
      set({ editingMealId: null });
    } catch (error) {
      console.error(`Error updating meal: ${mealId} under dayId: ${meal.dayId}`, error);
    }
  },
}));

export default useMealStore;

