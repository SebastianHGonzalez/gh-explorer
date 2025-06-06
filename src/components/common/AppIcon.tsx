import { SIZE } from "@/styles/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import type { MD3Colors } from "react-native-paper/lib/typescript/types";

export type AppIconName = keyof typeof mapIcon;
export type AppIconColor = keyof Omit<MD3Colors, "elevation">;
export type AppIconSize = keyof typeof SIZE | number;

const mapIcon = {
  followers: "people-outline",
  following: "person-add-outline",
  repos: "book-outline",
  company: "business-outline",
  location: "location-outline",
  email: "mail-outline",
  blog: "link-outline",
  twitter: "logo-twitter",
  favorited: 'star',
  unfavorited: 'star-outline',
  tabHome: 'home-outline',
  tabHomeFocused: 'home',
  tabSearch: 'search-outline',
  tabSearchFocused: 'search',
  tabFavorites: 'star-outline',
  tabFavoritesFocused: 'star',
} as const;

const defaultColors = {
  twitter: "#1da1f2",
} as const;

interface AppIconProps {
  name: AppIconName;
  size?: AppIconSize;
  color?: AppIconColor;
}

export function AppIcon({ name, size = "xl", color }: AppIconProps) {
  const theme = useTheme();

  return (
    <Ionicons
      name={mapIcon[name]}
      size={typeof size === 'number' ? size : SIZE[size]}
      color={
        color
          ? (theme.colors[color] || color)
          : (defaultColors as any)[name] || theme.colors.primary
      }
    />
  );
}
