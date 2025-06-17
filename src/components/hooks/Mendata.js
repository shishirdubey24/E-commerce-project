import { useQuery } from "@tanstack/react-query";
export const Mendata = () => {
  return useQuery({
    queryKey: ["Men"],
    queryFn: async () => {
      const data = await fetch("https://fakestoreapi.com/products");
      const res = await data.json();
      return res;
    },
  });
};
