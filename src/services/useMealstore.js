import create from 'zustand';
import { fetchMeals, updateMeal, removeMeal } from './datastore';
import { fetchPantryItems as fetchPantryItemsAPI, fetchRecipesByIngredients } from './datastore';

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

  setPantryItems: (items) => set({ pantryItems: items }),
  setRecipes: (recipes) => set({ recipes }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchPantryItems: async () => {
    try {
      set({ isLoading: true });
      const items = await fetchPantryItemsAPI();
      set({ pantryItems: items, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchRecipesBasedOnPantry: async () => {
    try {
      set({ isLoading: true });
      const ingredients = get().pantryItems.map(item => item.name).join(",");
      const recipes = await fetchRecipesByIngredients(ingredients);
      set({ recipes, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  setMealName: (name) => set(() => ({ mealName: name })),
  setMealType: (type) => set(() => ({ mealType: type })),
  setRecipeDetails: (details) => set(() => ({ recipeDetails: details })),
  addIngredient: (ingredient) => set((state) => ({
    recipeDetails: {
      ...state.recipeDetails,
      ingredients: [...state.recipeDetails.ingredients, ingredient],
    },
  })),
  addStep: (step) => set((state) => ({
    recipeDetails: {
      ...state.recipeDetails,
      steps: [...state.recipeDetails.steps, step],
    },
  })),
  resetMealCreation: () => set(() => ({ mealName: '', mealType: '', recipeDetails: { ingredients: [], steps: [] } })),

  fetchMealList: () => {
    fetchMeals((fetchedMeals) => {
      set({ mealList: fetchedMeals || [] });
    });
  },
    initiateMealEdit: (meal) => {
    const mealToEdit = get().mealList.find((m) => m.id === meal.id);
    if (mealToEdit) {
      set({
        editingMealId: meal.id,
        editedMeal: { name: mealToEdit.mealName, description: mealToEdit.description },
      });
      console.log("Initiating edit for meal:", meal);
    } else {
      console.error('Meal not found for editing:', meal);
    }
  },

  clearMealEdit: () => {
    set({ editingMealId: null, editedMeal: { name: '', description: '' } });
  },

  commitMealEdit: (mealId) => {
    const meal = get().mealList.find(m => m.id === mealId);
    if (!meal) {
      console.error('Meal not found for editing:', mealId);
      return; 
    }
  
    const { editedMeal } = get();
    
    if (!editedMeal.name || editedMeal.description === undefined) {
      console.error('Required meal properties are missing');
      return; 
    }
  
    console.log(`Committing edit for mealId: ${mealId} under dayId: ${meal.dayId}`, editedMeal);
  
    updateMeal(meal.dayId, mealId, editedMeal).then(() => {
      get().fetchMealList();
      get().clearMealEdit();
    }).catch(error => {
      console.error(`Error updating meal: ${mealId} under dayId: ${meal.dayId}`, error);
    });
  },
  
  
  
  deleteMeal: (mealId) => {
    const meal = get().mealList.find(m => m.id === mealId);
    if (meal) {
      console.log(`Attempting to delete meal with mealId: ${mealId} under dayId: ${meal.dayId}`);
      removeMeal(meal.dayId, mealId, () => {
        console.log(`Meal with mealId: ${mealId} under dayId: ${meal.dayId} has been successfully deleted.`);
        get().fetchMealList();
      }).catch(error => {
        console.error(`Error deleting meal: ${mealId} under dayId: ${meal.dayId}`, error);
      });
    } else {
      console.error('Meal not found for deletion:', mealId);
    }
  },
  }));

export default useMealStore;
