import create from 'zustand';

const useMealStore = create((set) => ({
  mealName: '',
  mealType: '',
  recipeDetails: { ingredients: [], steps: [] },
  setMealName: (name) => set(() => ({ mealName: name })),
  setMealType: (type) => set(() => ({ mealType: type })),
  setRecipeDetails: (details) => set(() => ({ recipeDetails: details })),
  addIngredient: (ingredient) =>
    set((state) => ({
      recipeDetails: {
        ...state.recipeDetails,
        ingredients: [...state.recipeDetails.ingredients, ingredient],
      },
    })),
  addStep: (step) =>
    set((state) => ({
      recipeDetails: {
        ...state.recipeDetails,
        steps: [...state.recipeDetails.steps, step],
      },
    })),
  resetMeal: () => set(() => ({ mealName: '', mealType: '', recipeDetails: { ingredients: [], steps: [] } })),
}));

export default useMealStore;
