import React, { useState } from 'react';;
//  We can use onlclick with but it only work when we click on the button we want action to occur when click enter.
// Our next goal is how to put data which we got  from handleclick ( console.log(e)) to the place where we want it to show.
// In react we do it with the help of control events.
// number() to change the output which come as string by e.target.value to number
const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: true },
  ];
export default function  App(){
return(
    <div className='app'>
    <Logo/>
    <Form/>
    <PackingList/>
    <Stats/>

    </div>
)
}
function Logo () {
return <h1>🌴 Far Away 💼</h1>
}
function Form (){
    const [description,setdescription] = useState("");
    const [quantity,setQuantity] = useState("1");
    function handleSubmit(e){
        e.preventDefault();
        if(!description) return;
        const newItem = {description,quantity,packed:false,id:Date.now()};
        console.log(newItem)
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
function PackingList (){
return(
<div className = 'list'>
    <ul>
    {initialItems.map(item=>(<Item item = {item} key = {item.id}/>))}

</ul>
</div>
);
}
function Item({item}){
    return (
    <li>
        <span style={item.packed ? {textDecoration:'line-through' }:{}}>
            {item.quantity} {item.description}
        </span>
        <button>❌</button>
        
    </li>
    );
}
function Stats (){
    return(
    <footer className='stats'>
        <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
)
}