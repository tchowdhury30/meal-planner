const API_KEY = 'dd96b00c6aa94d3dbb2fc50f9b41b009';

export const fetchRecipesByIngredients = async (ingredients) => {
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch recipes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipes by ingredients:', error);
    throw error; 
  }
};

export const fetchRandomRecipe = async () => {
  const url = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('No random recipe found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw error; 
  }
};
