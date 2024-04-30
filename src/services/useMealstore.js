import create from 'zustand';
import { fetchMeals, updateMeal, removeMeal } from './datastore';

const useMealStore = create((set, get) => ({
  mealName: '',
  mealType: '',
  recipeDetails: { ingredients: [], steps: [] },

  mealList: [],
  editingMealId: null,
  editedMeal: { name: '', description: '' },

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
    if (meal) {
      console.log(`Committing edit for mealId: ${mealId} under dayId: ${meal.dayId}`, get().editedMeal);
      const { editedMeal } = get();
      updateMeal(meal.dayId, mealId, editedMeal, () => {
        get().fetchMealList();
        get().clearMealEdit();
      }).catch(error => {
        console.error(`Error updating meal: ${mealId} under dayId: ${meal.dayId}`, error);
      });
    } else {
      console.error('Meal not found for editing:', mealId);
    }
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
