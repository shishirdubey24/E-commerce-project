import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const BASE_URL = "https://e-commerce-project-51z6.onrender.com";
export const Fetchdata = ({ categoryOverride } = {}) => {
  const reduxCategory = useSelector(
    (state) => state.category?.selected || "featured",
  );
  const category = categoryOverride ?? reduxCategory;
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category && category !== "featured") params.set("category", category);

      const url = params.toString()
        ? `${BASE_URL}/fetch/data?${params.toString()}`
        : `${BASE_URL}/fetch/data`;

      const res = await fetch(url);
      if (!res.ok)
        throw new Error(`Failed to fetch data from server (${res.status})`);
      const data = await res.json();

      return data; // { items, totalCount? }
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (err) => {
      console.error("[Fetchdata] fetch error:", err);
    },
  });
};
