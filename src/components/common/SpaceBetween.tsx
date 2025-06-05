import { SIZE } from "@/styles/constants";
import { PropsWithChildren } from "react";
import { FlexAlignType, StyleSheet, View, ViewStyle } from "react-native";
import { Slot } from "./Slot";

type Size = keyof typeof SIZE;

interface SpaceBetweenProps {
  direction?: Direction;
  align?: FlexAlignType;
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  size?: Size;
  wrap?: 'wrap' | 'no-wrap';
  style?: ViewStyle;
  asChild?: boolean;
}

type Direction = "vertical" | "horizontal";

const directionStyle: Record<Direction, ViewStyle> = {
  horizontal: { flexDirection: "row" },
  vertical: { flexDirection: "column" },
};

const baseStyle: ViewStyle = {
  display: "flex",
};

export function SpaceBetween({
  direction = "horizontal",
  size = "md",
  align,
  justify,
  wrap = "wrap",
  style,
  asChild,
  children,
}: PropsWithChildren<SpaceBetweenProps>) {
  const Comp = asChild ? Slot : View;

  return (
    <Comp
      style={StyleSheet.flatten([
        baseStyle,
        directionStyle[direction],
        { alignItems: align, gap: SIZE[size], justifyContent: justify, flexWrap: wrap },
        style,
      ])}
    >
      {children}
    </Comp>
  );
}
