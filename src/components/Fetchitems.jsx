import { useEffect } from "react";
import {  useDispatch } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
//import { fetchStatusActions } from "../store/fetchStatusSlice";
import {useQuery} from "@tanstack/react-query"
import ShimmerUI from "./ShimmerUI";
const FetchItems = () => {
  const dispatch = useDispatch();

  
    const fetchData=async()=>{
     try {
      
      const res= await  fetch("/items.json" )
       const data= await res.json();
       return data;
     } catch (error) {
     throw new Error("Failed to fetch product data: " + error.message);
     }
    }
     const { data,isLoading,error}= useQuery({
        queryKey:['products'],
        queryFn: fetchData,
      })
   
       useEffect(()=>{
        if(data)  dispatch(itemsActions.addInitialItems(data.items[0]));
      },[data,dispatch])
     if(isLoading) return <ShimmerUI/>;

if (error) return (<p >
   Error: Failed to fetch product data.</p>)

  return <></>;
};

export default FetchItems;
