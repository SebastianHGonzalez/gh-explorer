import { SIZE } from "@/styles/constants";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";
import { Slot } from "./Slot";

type Variant = "default" | "error" | "warning" | "info";
type Elevation =  0 | 1 | 2 | 3 | 4 | 5;

interface ContainerProps extends ViewProps {
  asChild?: boolean;
  variant?: Variant;
  elevation: Elevation
}

export function useContainerStyle(elevation: Elevation): ViewStyle {
  const theme = useTheme();

  return {
    elevation: elevation,
    backgroundColor: theme.colors.elevation[`level${elevation}`],
    borderRadius: theme.roundness,
    borderWidth: SIZE.xxs,
    padding: SIZE.sm,
    marginHorizontal: SIZE.sm,
    marginVertical: SIZE.md,
    paddingHorizontal: SIZE.lg,
    paddingVertical: SIZE.md,
  };
}

export function Container({
  asChild = false,
  variant,
  style,
  elevation,
  ...props
}: ContainerProps) {
  const theme = useTheme();
  const containerStyle = useContainerStyle();
  const Comp = asChild ? Slot : View;

  return (
    <Comp
      {...props}
      style={StyleSheet.flatten([
        getVariant(theme, variant),
        containerStyle,
        style,
      ])}
    />
  );
}

function getVariant(theme: MD3Theme, variant?: Variant): ViewStyle {
  switch (variant) {
    case "error":
      return { backgroundColor: theme.colors.error };
    default:
      return { backgroundColor: theme.colors.background };
  }
}
