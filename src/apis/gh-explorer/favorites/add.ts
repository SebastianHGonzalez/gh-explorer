import { addFavorite, AddFavoriteInput } from "@/db/favorites";
import { MutationOptions } from "@tanstack/react-query";
import { SQLiteDatabase } from "expo-sqlite";

export function addFavoriteMutation(db: SQLiteDatabase, input: AddFavoriteInput): MutationOptions {
  return {
    mutationKey: ["gh-explorer", "addFavorite", input],
    mutationFn: async () => addFavorite(db, input),
  };
}
