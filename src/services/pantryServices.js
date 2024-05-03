import { ref, push, onValue, set, remove } from "firebase/database";
import { db } from './firebaseConfig';

export const fetchPantryItems = (callback) => {
    const pantryRef = ref(db, 'pantryItems/');
    onValue(pantryRef, (snapshot) => {
      const data = snapshot.val();
      const pantryItems = data ? Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value
      })) : [];
      callback(pantryItems);
      
    });
    
  };

  export const fetchTopIngredientsRecipes = async (pantryItems, fetchRecipesByIngredients) => {
    const topIngredients = pantryItems.slice(0, 3).map(item => item.name).join(",");
    return await fetchRecipesByIngredients(topIngredients);
  };
  
  export const addPantryItem = (item, callback) => {
    const pantryRef = ref(db, 'pantryItems/');
    push(pantryRef, item).then(() => {
      console.log('Added Pantry Item:', item);  
      callback();
    }).catch(error => {
      console.error('Error adding pantry item:', error);
    });
  };
  
  export const updatePantryItem = (itemId, itemData, callback) => {
    const itemRef = ref(db, `pantryItems/${itemId}`);
    set(itemRef, itemData).then(() => {
      console.log('Updated Pantry Item:', itemId, itemData); 
      callback();
    }).catch(error => {
      console.error('Error updating pantry item:', error);
    });
  };
  
  export const removePantryItem = (itemId, callback) => {
    const itemRef = ref(db, `pantryItems/${itemId}`);
    remove(itemRef).then(() => {
      console.log('Removed Pantry Item:', itemId);  
      callback();
    }).catch(error => {
      console.error('Error removing pantry item:', error);
    });
  };