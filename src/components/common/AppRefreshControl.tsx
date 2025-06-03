import { RefreshControlProps } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

export function AppRefreshControl(props: RefreshControlProps) {
  const theme = useTheme();

  return (
    <RefreshControl
      {...props}
      colors={[theme.colors.onPrimary]}
      tintColor={theme.colors.onPrimary}
      progressBackgroundColor={theme.colors.primary}
    />
  );
}
