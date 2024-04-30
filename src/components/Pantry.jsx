import React, { useState, useEffect } from 'react';
import { fetchPantryItems, addPantryItem, updatePantryItem, removePantryItem } from '../services/pantryServices'; 

const Pantry = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });

  useEffect(() => {
    fetchPantryItems(setPantryItems);
  }, []);

  const handleAdd = () => {
    addPantryItem(newItem, () => {
      fetchPantryItems(setPantryItems);
      setNewItem({ name: '', quantity: '' });
    });
  };

  const handleUpdate = (item, newQuantity) => {
    if (newQuantity !== '') {
      updatePantryItem(item.id, { ...item, quantity: newQuantity }, () => {
        fetchPantryItems(setPantryItems);
      });
    }
  };

  const handleRemove = (itemId) => {
    removePantryItem(itemId, () => fetchPantryItems(setPantryItems));
  };

  return (
    <div>
      <h2>My Pantry</h2>
      <ul>
        {pantryItems.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity:
            <input
              type="text"
              defaultValue={item.quantity}
              onBlur={(e) => handleUpdate(item, e.target.value)}
            />
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        placeholder="Item Name"
      />
      <input
        type="text"
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        placeholder="Quantity"
      />
      <button onClick={handleAdd}>Add New Item</button>
    </div>
  );
};

export default Pantry;
