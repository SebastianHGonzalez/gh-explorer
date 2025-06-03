import {
    Favorites,
    getAllFavorites,
    GetAllFavoritesInput,
} from "@/db/favorites";
import { InfiniteData, infiniteQueryOptions } from "@tanstack/react-query";
import { SQLiteDatabase } from "expo-sqlite";

type ListFavorites = Favorites[];

export function listFavoritesQuery(
  db: SQLiteDatabase,
  input?: GetAllFavoritesInput,
) {
  return infiniteQueryOptions<ListFavorites,Error,InfiniteData<ListFavorites>,unknown[],number>({
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam = 0) =>
      lastPageParam + 1,
    queryKey: ["gh-explorer", "favorites"],
    queryFn: async ({ pageParam }) =>
      getAllFavorites(db, { ...input, offset: pageParam }),
    initialData: {
      pages: [],
      pageParams: [],
    },
  });
}
