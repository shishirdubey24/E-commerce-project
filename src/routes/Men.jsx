import { useSelector } from "react-redux";
import ShowMendata from "../components/ShowMendata";

const Men=()=>{
     const mendata=useSelector((store)=>store.mendata);
    
      
     return(
        <>
          <div  style={{
        display: "flex", // Use flexbox for layout
        flexWrap: "wrap", // Allow wrapping for smaller screens
        justifyContent: "space-between", // Evenly distribute items
        gap: "20px", // Add space between items
        padding: "20px",
      }} >
           {mendata.map((mendata)=>{
             if (!mendata.id) {
              console.error("Item ID is undefined for item:", mendata);
              return null; // Skip rendering this item
          }
            return <ShowMendata key={mendata.id} mendata={mendata}/>
           })}
           
          </div>

        </>
    )
}
export default Men;