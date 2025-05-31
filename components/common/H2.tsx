import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { Slot } from "./Slot";
import { MD3Theme, useTheme } from "react-native-paper";

type Variant = "default" | "error" | "warning" | "info";

interface ContainerProps extends TextProps {
  asChild?: boolean;
  variant?: Variant;
}

export function useH2Style() {
  const theme = useTheme();
  return theme.fonts.headlineMedium;
}

export function H2({
  asChild = false,
  variant,
  style,
  ...props
}: ContainerProps) {
  const theme = useTheme();
  const h2Style = useH2Style();
  const Comp = asChild ? Slot : Text;

  return (
    <Comp
      {...props}
      style={StyleSheet.flatten([getVariant(theme, variant), h2Style, style])}
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
