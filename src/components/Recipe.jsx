import React from 'react';
import useMealStore from '../services/useMealstore'; 

const Recipe = () => {
  const { recipeDetails, setRecipeDetails, addIngredient, addStep } = useMealStore();

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipeDetails.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setRecipeDetails({ ...recipeDetails, ingredients: newIngredients });
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...recipeDetails.steps];
    newSteps[index] = value;
    setRecipeDetails({ ...recipeDetails, steps: newSteps });
  };

  const addIngredientField = () => {
    addIngredient({ name: '', amount: '', unit: '' });
  };

  const addStepField = () => {
    addStep('');
  };

  return (
    <div>
      <h3>Ingredients</h3>
      {recipeDetails.ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
            placeholder="Ingredient"
          />
          <input
            type="text"
            value={ingredient.amount}
            onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
            placeholder="Amount"
          />
          <input
            type="text"
            value={ingredient.unit}
            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
            placeholder="Unit"
          />
        </div>
      ))}
      <button type="button" onClick={addIngredientField}>Add Ingredient</button>

      <h3>Steps</h3>
      {recipeDetails.steps.map((step, index) => (
        <textarea
          key={index}
          value={step}
          onChange={(e) => handleStepChange(index, e.target.value)}
          placeholder={`Step ${index + 1}`}
        />
      ))}
      <button type="button" onClick={addStepField}>Add Step</button>
    </div>
  );
};

export default Recipe;
