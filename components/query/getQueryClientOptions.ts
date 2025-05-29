import { QueryClientConfig } from "@tanstack/react-query";

export function getQueryClientOptions(): QueryClientConfig {
  return {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 60, // 1 hours
      },
    },
  };
}
