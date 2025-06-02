import { removeFavorite, RemoveFavoriteInput } from "@/db/favorites";
import { MutationOptions } from "@tanstack/react-query";
import { SQLiteDatabase } from "expo-sqlite";

export function removeFavoriteMutation(db: SQLiteDatabase, input: RemoveFavoriteInput): MutationOptions {
  return {
    mutationKey: ["gh-explorer", "removeFavorite", input],
    mutationFn: async () => removeFavorite(db, input),
  };
}
