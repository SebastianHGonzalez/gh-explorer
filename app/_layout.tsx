import QueryClientProvider from "@/components/query/QueryClientProvider";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <QueryClientProvider>
      <Stack />
    </QueryClientProvider>
  );
}
