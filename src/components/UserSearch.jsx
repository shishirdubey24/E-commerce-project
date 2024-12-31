/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import FilteredItem from "./FIlteredItems";
const User=({prop})=>{
 const initialItems = useSelector((store) => store.items) ;

console.log("InitialItems are",initialItems)

if (!prop) {
  console.log("Waiting for AI response...");
  return <div>Loading...</div>;
}
const sanitizedProp = prop?.trim()?.toLowerCase() || ""; 
const filteredItems = initialItems.filter((item) => {
  //  console.log("Checking item:", item.item_name, "against prop:", prop); // Log comparison
    return item.category?.trim()?.toLowerCase() === sanitizedProp;
  });
console.log("Filtered are",filteredItems)
 console.log("User Prop",prop);  
 
 if (filteredItems.length === 0) {
  return <div>No items found for the selected category.</div>;
}

    return(
        <>
         {filteredItems.map((filtereditem)=>
                (<FilteredItem key={filtereditem.id} filtereditem={filtereditem} />

               ))}
        </>
    )
}
export default User;