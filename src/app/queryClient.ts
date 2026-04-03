import { QueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/shared/api/http";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Only retry on network errors or 5xx errors, not on 4xx errors
        if (getApiErrorMessage(error).includes("Network Error")) {
          return failureCount < 2;
        }
        return false;
      },
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
    mutations: {
      retry: false,
    },
  },
});
