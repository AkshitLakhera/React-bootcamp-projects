import React from 'react';
import { ItemContext, ItemProvider } from './ItemContext';

function App() {
  return (
    <div className='app'>
      <ItemProvider>
        <Logo />
        <Form />
        <PackingList />
        <Stats />
      </ItemProvider>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form() {
  const { onAddItems } = React.useContext(ItemContext);
  const [description, setDescription] = React.useState('');
  const [quantity, setQuantity] = React.useState('1');

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription('');
    setQuantity('1');
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item..'
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  const { items, onToggleItems, onDeleteItems, onDeleteAllItems } = React.useContext(ItemContext);
  const [sortBy, setSortBy] = React.useState('input');

  let sortedItem;
  if (sortBy === 'input') sortedItem = items;
  if (sortBy === 'description')
    sortedItem = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === 'packed') sortedItem = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className='list'>
      <ul>
        {sortedItem.map((item) => (
          <Item item={item} key={item.id} onDeleteItems={onDeleteItems} onToggleItems={onToggleItems} />
        ))}
      </ul>
      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onDeleteAllItems}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item }) {
  const { onToggleItems, onDeleteItems } = React.useContext(ItemContext);
  return (
    <li>
      <input type='checkbox' value={item.packed} onChange={() => onToggleItems(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  const { items } = React.useContext(ItemContext);

  if (!items.length)
    return (
      <p className='stats'>
        <em>Start adding some items to your packing list</em>
      </p>
    );

  const totalItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / totalItems) * 100);

  return (
    <footer className='stats'>
      <em>
        You have {totalItems} items on your list, and you already packed {numPacked} & is percent {percentage}%
        packed
      </em>
    </footer>
  );
}

export default App;
