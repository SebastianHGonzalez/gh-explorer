import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
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

  const syncStoragePersister = useMemo(
    () =>
      createSyncStoragePersister({
        storage: window.localStorage,
      }),
    []
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: syncStoragePersister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
