import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
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

  const asyncStoragePersister = useMemo(
    () =>
      createAsyncStoragePersister({
        storage: AsyncStorage,
      }),
    []
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
