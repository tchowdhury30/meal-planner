//const API_KEY = 'dd96b00c6aa94d3dbb2fc50f9b41b009';
const API_KEY = 'bddb74b7f9204c21b4c2c73673a2a058';
//const API_KEY = '2a957a08d62f426a9df61e1d53227ce5';
//const API_KEY = 'fake';

export const fetchRecipesByIngredients = async (ingredients) => {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const recipes = await response.json();
      console.log('Recipes fetched successfully:', recipes);
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes by ingredients:', error);
      throw error; 
    }
  };

  export const fetchRecipeInstructions = async (recipeId) => {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch recipe instructions');
        const instructions = await response.json();
        // console.log('Recipe instructions fetched successfully:', instructions);
        return instructions;
    } catch (error) {
        console.error('Error fetching recipe instructions:', error);
        throw error;
    }
};

export const fetchRandomRecipe = async () => {
  const url = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`;
  console.log('Fetching random recipe');
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('No random recipe found');
    const data = await response.json();
    console.log('Random recipe fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw error; 
  }
};

