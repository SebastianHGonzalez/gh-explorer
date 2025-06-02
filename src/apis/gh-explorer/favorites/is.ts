import { isFavorite, IsFavoriteInput } from "@/db/favorites";
import { queryOptions } from "@tanstack/react-query";
import { SQLiteDatabase } from "expo-sqlite";

type IsFavorite = boolean;

export function isFavoritesQuery(db: SQLiteDatabase, input: IsFavoriteInput) {
  return queryOptions<IsFavorite, Error>({
    queryKey: ["gh-explorer", "isFavorite", input],
    queryFn: async () => isFavorite(db, input),
  });
}
