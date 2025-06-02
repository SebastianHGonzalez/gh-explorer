import { listFavoritesQuery } from "@/apis/gh-explorer/favorites";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

export function useListFavoriteUsers() {
  const db = useSQLiteContext();
  return useInfiniteQuery(listFavoritesQuery(db));
}
