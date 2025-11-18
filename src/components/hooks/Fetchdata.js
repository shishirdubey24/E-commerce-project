import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const BASE_URL = "https://e-commerce-project-76em.onrender.com";
export const Fetchdata = ({ categoryOverride } = {}) => {
  const reduxCategory = useSelector(
    (state) => state.category?.selected || "featured"
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

      console.log("[Fetchdata] requesting:", url, "category:", category);

      const res = await fetch(url);
      if (!res.ok)
        throw new Error(`Failed to fetch data from server (${res.status})`);
      const data = await res.json();

      console.log(
        "[Fetchdata] response items:",
        (data?.items || []).length,
        "category:",
        category
      );

      return data; // { items, totalCount? }
    },
    keepPreviousData: true,
    staleTime: 30_000,
    onError: (err) => {
      console.error("[Fetchdata] fetch error:", err);
    },
  });
};
