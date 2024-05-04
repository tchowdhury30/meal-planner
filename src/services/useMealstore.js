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
  imageUrl: '',

  // Meal and Pantry Functions
  setMealName: name => set({ mealName: name }),
  setMealType: type => set({ mealType: type }),
  setMealList: (meals) => set({ mealList: meals }),
  setRecipeDetails: details => set({ recipeDetails: details }),
  setImageUrl: url => set({ imageUrl: url }),
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

  // Fetch data functions
  fetchMealList: () => mealServices.fetchMeals(meals => set({ mealList: meals || [] })),
  fetchPantryItems: async () => {
    set({ isLoading: true });
    try {
      const items = await pantryServices.fetchPantryItems();
      set({ pantryItems: items, isLoading: false });
      console.log("everything", items)
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
    
  },
  fetchRecipesBasedOnPantry: async (pantryItems) => {
    set({ isLoading: true });
    try {
      const ingredients = pantryItems.map(item => item.name.trim()).filter(name => name).join(",");
      
      if (ingredients) {
        const recipes = await spoonacularAPI.fetchRecipesByIngredients(ingredients);
        set({ recipes: recipes, isLoading: false });
      } else {
        console.error("No valid ingredients to fetch recipes for.");
        set({ recipes: [], isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      set({ error: error.message, isLoading: false });
    }
  },
  fetchRecipeDetails: async (recipeId) => {
    set({ isLoading: true });
    try {
      const recipeDetails = await spoonacularAPI.fetchRecipeInstructions(recipeId);
      set({ recipeDetails: recipeDetails, isLoading: false });
    } catch (error) {
      console.error("Error fetching recipe instructions:", error);
      set({ error: error.message, isLoading: false });
    }
  },
  selectRecipe: (recipe) => {
    set((state) => ({
      selectedRecipe: {
        ...state.selectedRecipe,
        ...recipe,
        ingredients: recipe.ingredients || [],
        steps: recipe.steps || []
      }
    }));
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
      console.error(`Error updating meal: ${mealId} under dayId: 'Any`, error);
    }
  },
}));

export default useMealStore;
