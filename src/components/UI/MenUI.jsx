import { useDispatch } from "react-redux";
import { Mendata } from "../hooks/Mendata"
import ShimmerUI from "./ShimmerUI";
import { useEffect } from "react";
import { mendataActions } from "../../store/MendataSlice";
const MenUI = () => {
    const {data,error,isLoading}=Mendata();
    const dispatch=useDispatch();
   useEffect(()=>{
    if(data)  dispatch(mendataActions.addMendata(data));
   })
    if(isLoading) return <ShimmerUI/>;

if (error) return (<p > Error: Failed to fetch product data.</p>)
  
    return (
    <div>  
    </div>
  )
}

export default MenUI
