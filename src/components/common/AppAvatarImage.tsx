import { SIZE } from "@/styles/constants";
import React, { ComponentProps } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

type ImageSize = keyof typeof SIZE;

interface AppAvatarImageProps extends ComponentProps<typeof Animated.Image> {
  size: ImageSize | number;
  containerProps?: ComponentProps<typeof View>;
}

export function AppAvatarImage({
  containerProps,
  size,
  style,
  ...props
}: AppAvatarImageProps) {
  const { colors } = useTheme();
  const calcSize = typeof size === "number" ? size : SIZE[size] || SIZE.md;
  const defaultStyle = {
    width: calcSize,
    height: calcSize,
    borderRadius: calcSize / 2,
    backgroundColor: colors?.primary,
  };

  return (
    <Animated.Image
      style={[defaultStyle, style]}
      accessibilityIgnoresInvertColors
      {...props}
    />
  );
}
