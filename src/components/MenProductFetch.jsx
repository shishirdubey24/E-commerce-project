import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { mendataActions } from "../store/MendataSlice";
import ShimmerUI from "./ShimmerUI";

const fetchMenProducts = async () => {
  const res = await axios.get("https://fakestoreapi.com/products");
 
  return res.data;
};

const MenProduct = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["men-products"],
    queryFn: fetchMenProducts,
  });

  useEffect(() => {
    if (data) {
      dispatch(mendataActions.addMendata(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <ShimmerUI/>;

  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>Error fetching mens data.</p>;

  return <></>; // You can map through data if needed
};

export default MenProduct;
