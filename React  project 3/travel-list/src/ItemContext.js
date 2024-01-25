import React, { createContext, useState } from 'react';

export const ItemContext = createContext({
  items: [],
  onToggleItems: () => {},
  onDeleteItems: () => {},
});

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const onToggleItems = (id) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)));
  };

  const onDeleteItems = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const onDeleteAllItems = () => {
    setItems([]); // Set the items array to an empty array to delete all items
  };
  const onAddItems = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  return (
    <ItemContext.Provider value={{ items, onToggleItems, onDeleteItems,onDeleteAllItems,onAddItems }}>
      {children}
    </ItemContext.Provider>
  );
};