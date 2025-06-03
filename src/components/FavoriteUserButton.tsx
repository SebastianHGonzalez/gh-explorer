import { useFavoriteUser } from "@/hooks/gh-explorer/favorites/useFavoriteUser";
import { t } from "@/i18n/t";
import { useCallback } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { AppIcon } from "./common/AppIcon";

interface FavoriteUserButtonProps {
  login: string;
  style?: StyleProp<ViewStyle>;
}

export function FavoriteUserButton({ login, style }: FavoriteUserButtonProps) {
  const theme = useTheme();
  const { isFavorite, isLoading, isUpdating, addFavorite, removeFavorite } =
    useFavoriteUser(login);

  const animation = useFavoriteUserAnimation();

  const handleRemoveFavorite = useCallback(() => {
    removeFavorite();
    animation.onUnfavorite();
  }, [removeFavorite]);
  const handleAddFavorite = useCallback(() => {
    addFavorite();
    animation.onFavorite();
  }, [addFavorite]);

  return (
    <TouchableOpacity
      onPress={isFavorite ? handleRemoveFavorite : handleAddFavorite}
      accessibilityLabel={t("FavoriteUserButton.accessibilityLabel")}
      disabled={isLoading || isUpdating}
      style={style}
    >
      <Animated.View style={animation.style}>
        <AppIcon
          name={isFavorite ? "favorited" : "unfavorited"}
          size="xl"
          color={isFavorite ? "primary" : "onSurface"}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

function useFavoriteUserAnimation() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return {
    style: animatedStyle,
    onFavorite: () => {
      scale.value = withSpring(1.2, { duration: 50 }, () => {
        scale.value = withSpring(1);
      });
    },
    onUnfavorite: () => {
      scale.value = withSpring(0.8, { duration: 50 }, () => {
        scale.value = withSpring(1);
      });
    },
  } as const;
}
