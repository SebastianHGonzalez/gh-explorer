import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { Slot } from "./Slot";
import { MD3Theme, useTheme } from "react-native-paper";

type Variant = "default" | "error" | "warning" | "info";

interface ContainerProps extends TextProps {
  asChild?: boolean;
  variant?: Variant;
}

export function useH3Style() {
  const theme = useTheme();
  return theme.fonts.headlineSmall;
}

export function H3({
  asChild = false,
  variant,
  style,
  ...props
}: ContainerProps) {
  const theme = useTheme();
  const h3Style = useH3Style();
  const Comp = asChild ? Slot : Text;

  return (
    <Comp
      {...props}
      style={StyleSheet.flatten([getVariant(theme, variant), h3Style, style])}
    />
  );
}

function getVariant(theme: MD3Theme, variant?: Variant): TextStyle {
  switch (variant) {
    case "error":
      return { color: theme.colors.onError };
    default:
      return { color: theme.colors.onBackground };
  }
}
