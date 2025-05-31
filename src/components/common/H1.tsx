import { StyleSheet, Text, TextProps } from "react-native";
import { Slot } from "./Slot";
import { useTextStyle } from "./useTextStyle";
import { ContainerType } from "./useContainerStyle";

interface ContainerProps extends TextProps {
  asChild?: boolean;
  variant?: ContainerType;
}

export function H1({
  asChild = false,
  variant,
  style,
  ...props
}: ContainerProps) {
  const PStyle = useTextStyle('h1', variant);
  const Comp = asChild ? Slot : Text;

  return (
    <Comp
      {...props}
      style={StyleSheet.flatten([PStyle, style])}
    />
  );
}
