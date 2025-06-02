import { addFavoriteMutation } from "@/apis/gh-explorer/favorites/add";
import { isFavoritesQuery } from "@/apis/gh-explorer/favorites/is";
import { removeFavoriteMutation } from "@/apis/gh-explorer/favorites/remove";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

export function useFavoriteUser(login: string) {
  const db = useSQLiteContext();
  const user = { login };
  const isFavorite = useQuery(isFavoritesQuery(db, user));
  const addFavorite = useMutation(addFavoriteMutation(db, user));
  const removeFavorite = useMutation(removeFavoriteMutation(db, user));

  return {
    isFavorite: isFavorite.data,
    isLoading: isFavorite.isLoading,
    isUpdating: addFavorite.isPending || addFavorite.isPending,
    addFavorite: () =>
      addFavorite.mutateAsync().then(() => {
        isFavorite.refetch();
      }),
    removeFavorite: () =>
      removeFavorite.mutateAsync().then(() => {
        isFavorite.refetch();
      }),
  };
}
