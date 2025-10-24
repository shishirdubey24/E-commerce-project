/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Fetchdata } from "./Fetchdata";

import { itemsActions } from "../../store/itemsSlice";

import ShimmerUI from "../UI/ShimmerUI";
export const HomeDataMap = ({currentPage,itemsPerPage}) => {


  const { data, isLoading, error } = Fetchdata({currentPage,itemsPerPage});
  const dispatch = useDispatch();
      
  useEffect(() => {
    if (data) dispatch(itemsActions.addInitialItems(data.items));
  }, [data, dispatch]);
  if (isLoading) return <ShimmerUI />;

  if (error) return <p> Error: Failed to fetch product data.</p>;
};
