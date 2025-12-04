import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { adminPanelActions } from "../../../store/adminSlice";
const BASE_URL = "https://e-commerce-project-76em.onrender.com";
const Products=()=>{
 const dispatch=useDispatch();
 
    useEffect(()=>{
        const fetching=async()=>{
try{
    dispatch(adminPanelActions.setLoading(true))
    const data =await fetch(`${BASE_URL}/admin`)
   if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);  
    const res= await data.json();
      dispatch(adminPanelActions.setAdminProducts(res))
 }
 catch(e){
  console.log("erros",e)
    dispatch(adminPanelActions.setError(e.message));
 }
    }
    fetching();
    },[dispatch])
   
 
}
export default Products