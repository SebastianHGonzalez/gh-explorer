import { SIZE } from "@/styles/constants";
import { SafeAreaView, StyleSheet, ViewProps, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";

interface ScreenProps extends ViewProps {}

export function useScreenStyle(): ViewStyle {
  const theme = useTheme();

  return {
    backgroundColor: theme.colors.elevation.level0,
    padding: SIZE.lg,
    flex: 1,
  };
}

export function Screen({ style, children, ...props }: ScreenProps) {
  const containerStyle = useScreenStyle();

  return (
    <SafeAreaView {...props} style={StyleSheet.flatten([containerStyle, style])}>
        {children}
    </SafeAreaView>
  );
}
