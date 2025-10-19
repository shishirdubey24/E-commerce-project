import { useQuery } from "@tanstack/react-query";

export const Fetchdata = ({ currentPage, itemsPerPage }) => {
  const page = currentPage;
  const limit = itemsPerPage;
  console.log(page);
  console.log(limit);

  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/fetch/data?page=${page}&limit=${limit}`
      );
      if (!res.ok) throw new Error("Failed to fetch data from server");
      const data = await res.json();
      return data;
    },
    enabled: page !== undefined && limit !== undefined, // ✅ prevents premature calls
  });
};
