import React, { useState } from 'react';;
//  We can use onlclick with but it only work when we click on the button we want action to occur when click enter.
// Our next goal is how to put data which we got  from handleclick ( console.log(e)) to the place where we want it to show.
// In react we do it with the help of control events.
// number() to change the output which come as string by e.target.value to number
export default function  App(){
    const [items,setItems] = useState([]); 

    function handleAddItems(item){
        setItems((items) => [...items,item]);
    }
    function handleDeleteItems(id){
        setItems((items) => items.filter((item) => item.id !== id));
    }
    function handleToggleItems(id){
        setItems((items) => items.map((item) =>  item.id === id ?{...item, packed: !item.packed } :item))
    } 
    // :item When you tick one box, you want to update the checked state for that specific item, but you don't want to accidentally change the checked state of any other boxes on the list.
    // The : item part makes sure that only the clicked box gets updated, while the others stay as they were.
return(
    <div className='app'>
    <Logo/>
    <Form onAddItems={handleAddItems}/>
    <PackingList items={items}  onDeleteItems={handleDeleteItems} onToggleItems={handleToggleItems}/>
    <Stats items={items}/>

    </div>
)
}
function Logo () {
return <h1>🌴 Far Away 💼</h1>
}
function Form ({onAddItems}){
    const [description,setdescription] = useState("");
    const [quantity,setQuantity] = useState("1");
    function handleSubmit(e){
        e.preventDefault();
        if(!description) return;
        const newItem = {description,quantity,packed:false,id:Date.now()};
        onAddItems(newItem);
        setdescription("");
        setQuantity("");
    }
return (
    <form className =  'add-form' onSubmit={handleSubmit}>
        <h3>What do you need for you trip ?</h3>
        <select value={quantity} onChange={(e)=> {
            setQuantity(Number(e.target.value));
        }}>
            {/* array from 1 to 20 */}
            {Array.from({length:20},(_,i)=> i +1 ).map((num) => (
                <option value={num} key = {num}>
                {num}
                </option>
            ))
            }
        </select>
        <input type = "text" placeholder = 'Item..' value={description} onChange={(e) => {
            setdescription(e.target.value)
        }}/>
        <button>Add</button> 
    </form>
)
}
function PackingList ({items,onDeleteItems,onToggleItems}){
const [sortBy,setSortBy] =useState("input") //by default sorted by input
let sortedItem
if(sortBy === "input")  sortedItem = items;
if (sortBy=== "description") sortedItem =items
.slice()
.sort((a,b) => a.description.localCompare(b.description));
if(sortBy === "packed") sortedItem= items
.splice()
.sort((a,b) =>  Number(a.packed) - Number(b.packed));
return(
<div className = 'list'>
    <ul>
    {sortedItem.map(item=>(<Item item = {item}  key = {item.id}  onDeleteItems={onDeleteItems}  onToggleItems={onToggleItems}/>))}

</ul>
{/* Sorting element added */}
<div className='actions'>
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">Sort by input</option>
        <option value= "description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
    </select>
</div>
</div>
);
}
function Item({item , onDeleteItems , onToggleItems}){
    return (
    <li>
    <input type="checkbox" value={item.packed} onChange={() => {onToggleItems(item.id)}} />
        <span style={item.packed ? {textDecoration:'line-through' }:{}}>
            {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItems(item.id)}>❌</button>
        
    </li>
    );
}
function Stats ({items}){
    if (!items.length) return( <p className='stats'>
  <em> Start adding some items to your packing list</em>
    </p>)
    const totalItems = items.length;
    const numPacked =  items.filter((item) => item.packed).length;
    const percentage = Math.round(numPacked/totalItems * 100)
    return(
    <footer className='stats'>
    <em>You have {totalItems} items on your list, and you already packed {numPacked} & is percent  {percentage}% packed</em>
    </footer>
)
}