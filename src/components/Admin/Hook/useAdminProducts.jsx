import axios from "axios";
//import { API_BASE_URL } from "../../../config/Api";
import { LOCAL_API_URL } from "../../../config/Api";
import { useInfiniteQuery } from "@tanstack/react-query";
export const useAdminProducts = () => {
  return useInfiniteQuery({
    queryKey: ["adminProducts"],
    
    // 2. The fetch function automatically receives pageParam from React Query
    queryFn: async ({ pageParam = null }) => {
      // Build the URL based on whether we have a cursor or not
      const url = pageParam 
        ? `${LOCAL_API_URL}/admin/products?cursor=${pageParam}&limit=20` 
        : `${LOCAL_API_URL}/admin/products?limit=20`;

     
      const response = await axios.get(url, {
        withCredentials: true 
      });
      
      return response.data;
    },
    
    getNextPageParam: (lastPage) => {
      // If the backend sent a nextCursor, return it. Otherwise, return undefined to stop fetching.
      return lastPage.nextCursor || undefined;
    },
    
    // Optional: Keep data fresh but don't spam the server
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
  });
};
       
 