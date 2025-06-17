import { useQuery } from "@tanstack/react-query";

export const Fetchdata = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/items.json");
      const data = await res.json();
      return data;
    },
  });
};
