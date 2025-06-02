import { StyleSheet, View, ViewProps } from "react-native";
import { Slot } from "./Slot";
import {
  ContainerStyleProvider,
  ContainerType,
  Elevation,
  useContainerStyle,
} from "./useContainerStyle";

interface ContainerProps extends ViewProps {
  asChild?: boolean;
  variant?: ContainerType;
  elevation?: Elevation;
}

export function Container({
  asChild = false,
  variant = "background",
  style,
  elevation,
  ...props
}: ContainerProps) {
  const containerStyle = useContainerStyle(variant, elevation);
  const Comp = asChild ? Slot : View;

  return (
    <ContainerStyleProvider type={variant}>
      <Comp {...props} style={StyleSheet.flatten([containerStyle, style])} />
    </ContainerStyleProvider>
  );
}
