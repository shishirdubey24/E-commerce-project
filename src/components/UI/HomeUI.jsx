import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Fetchdata } from "../hooks/Fetchdata";

import { itemsActions } from "../../store/itemsSlice";

import ShimmerUI from "./ShimmerUI"
const HomeUI = () => {
  
 const { data, isLoading, error }=Fetchdata();
    const dispatch=useDispatch();


   useEffect(()=>{
        if(data)  dispatch(itemsActions.addInitialItems(data.items[0]));
      },[data,dispatch])
       if(isLoading) return <ShimmerUI/>;

if (error) return (<p > Error: Failed to fetch product data.</p>)
  return (
    <div>
    </div>
  )
}
export default HomeUI;
