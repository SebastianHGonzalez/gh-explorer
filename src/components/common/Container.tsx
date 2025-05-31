import { StyleSheet, View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { Slot } from "./Slot";
import { ContainerType, Elevation, useContainerStyle } from "./useContainerStyle";

interface ContainerProps extends ViewProps {
  asChild?: boolean;
  variant?: ContainerType;
  elevation?: Elevation
}

export function Container({
  asChild = false,
  variant,
  style,
  elevation,
  ...props
}: ContainerProps) {
  const theme = useTheme();
  const containerStyle = useContainerStyle(variant, elevation);
  const Comp = asChild ? Slot : View;

  return (
    <Comp
      {...props}
      style={StyleSheet.flatten([
        containerStyle,
        style,
      ])}
    />
  );
}
