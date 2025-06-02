import { useFavoriteUser } from "@/hooks/gh-explorer/favorites/useFavoriteUser";
import { t } from "@/i18n/t";
import { useCallback } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { AppIcon } from "./common/AppIcon";

interface FavoriteUserButtonProps {
  login: string;
  style?: StyleProp<ViewStyle>;
}

export function FavoriteUserButton({ login, style }: FavoriteUserButtonProps) {
  const theme = useTheme();
  const { isFavorite, isLoading, isUpdating, addFavorite, removeFavorite } =
    useFavoriteUser(login);

  const handleRemoveFavorite = useCallback(() => {
    removeFavorite();
  }, [removeFavorite]);
  const handleAddFavorite = useCallback(() => {
    addFavorite();
  }, [addFavorite]);

  return (
    <TouchableOpacity
      onPress={isFavorite ? handleRemoveFavorite : handleAddFavorite}
      accessibilityLabel={t("FavoriteUserButton.accessibilityLabel")}
      disabled={isLoading || isUpdating}
      style={[{ opacity: isLoading || isUpdating ? 0.5 : 1 }, style]}
    >
      <AppIcon
        name={isFavorite ? "favorited" : "unfavorited"}
        size="xl"
        color={isFavorite ? "primary" : "onSurface"}
      />
    </TouchableOpacity>
  );
}
