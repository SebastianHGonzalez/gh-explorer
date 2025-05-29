import { QueryClient, QueryClientProvider as TSQueryClientProvider } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { getQueryClientOptions } from "./getQueryClientOptions";

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useMemo(
    () => new QueryClient(getQueryClientOptions()),
    []
  );

  return (
    <TSQueryClientProvider client={queryClient}>
      {children}
    </TSQueryClientProvider>
  );
}
