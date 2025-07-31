import { useDispatch } from "react-redux";
import { Mendata } from "./Mendata";
import ShimmerUI from "../UI/ShimmerUI";
import { useEffect } from "react";
import { mendataActions } from "../../store/MendataSlice";

export const NavbarFetch = () => {
  const { data, error, isLoading } = Mendata();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) dispatch(mendataActions.addMendata(data));
  });
  if (isLoading) return <ShimmerUI />;

  if (error) return <p> Error: Failed to fetch product data.</p>;
};
