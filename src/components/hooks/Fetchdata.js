import { useQuery } from "@tanstack/react-query";

export const Fetchdata = ({ currentPage, itemsPerPage }) => {
  const page = currentPage;
  const limit = itemsPerPage;
  const BASE_URL = import.meta.env.VITE_API_URL;
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/fetch/data?page=${page}&limit=${limit}`
      );
      if (!res.ok) throw new Error("Failed to fetch data from server");
      const data = await res.json();
      return data;
    },
    enabled: page !== undefined && limit !== undefined, // ✅ prevents premature calls
  });
};
