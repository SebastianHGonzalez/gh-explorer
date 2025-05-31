import { QueryClientConfig } from "@tanstack/react-query";

export function getQueryClientOptions(): QueryClientConfig {
  return {
    defaultOptions: {
      queries: {
        retry: 0,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 60, // 1 hours
      },
    },
  };
}
