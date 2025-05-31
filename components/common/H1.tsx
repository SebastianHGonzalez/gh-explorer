import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { Slot } from "./Slot";
import { MD3Theme, useTheme } from "react-native-paper";
import { SIZE } from "@/styles/constants";

type Variant = "default" | "error" | "warning" | "info";

interface ContainerProps extends TextProps {
  asChild?: boolean;
  variant?: Variant;
}

export function useH1Style() {
  const theme = useTheme();
  return theme.fonts.headlineLarge;
}

export function H1({
  asChild = false,
  variant,
  style,
  ...props
}: ContainerProps) {
  const theme = useTheme();
  const h1Style = useH1Style();
  const Comp = asChild ? Slot : Text;

  return (
    <Comp
      {...props}
      style={StyleSheet.flatten([getVariant(theme, variant), h1Style, style])}
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
