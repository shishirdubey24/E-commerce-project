import { useEffect  } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
//import MendataSlice from "../store/Mendata";
import {mendataActions} from "../store/MendataSlice"

const MenProduct=()=>{
   const dispatch=useDispatch();
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
      
        dispatch(mendataActions.addMendata(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return(
        <>
           
        </>
    )
}
export default MenProduct;