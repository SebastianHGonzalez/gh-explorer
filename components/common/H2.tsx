import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { Slot } from "./Slot";
import { MD3Theme, useTheme } from "react-native-paper";

type Variant = "default" | "error" | "warning" | "info";

interface ContainerProps extends TextProps {
  asChild?: boolean;
  variant?: Variant;
}

export function useH2Style(variant?: Variant): TextStyle {
  const theme = useTheme();
  return {
    ...theme.fonts.headlineMedium,
    ...getVariant(theme, variant)
  };
}

export function H2({
  asChild = false,
  variant,
  style,
  ...props
}: ContainerProps) {
  const h2Style = useH2Style();
  const Comp = asChild ? Slot : Text;

  return (
    <Comp
      {...props}
      style={StyleSheet.flatten([h2Style, style])}
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
