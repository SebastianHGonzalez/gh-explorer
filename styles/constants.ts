import { TextStyle, ViewStyle } from "react-native";
import { MD2Colors } from "react-native-paper";

export const COLORS = {
  primary: MD2Colors.purple100,
  secondary: MD2Colors.purple200,
  tertiary: MD2Colors.purple300,
  background: MD2Colors.purple50,
  surface: MD2Colors.purple50,
  error: MD2Colors.red600,
  text: MD2Colors.purple900,
  onPrimary: MD2Colors.purple900,
  onSecondary: MD2Colors.purple900,
  onTertiary: MD2Colors.purple900,
  onBackground: MD2Colors.purple900,
  onSurface: MD2Colors.purple900,
  onError: MD2Colors.red900,
  disabled: MD2Colors.purple400,
  placeholder: MD2Colors.purple400,
  backdrop: MD2Colors.purple300,
  notification: MD2Colors.red600,
};

export const SIZE = {
  xxs: 1,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  xxxxl: 64,
} as const;

export const FONT_SIZE = {
  xxs: 8,
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
} as const;

export const FONT_WEIGHT = {
  thin: "100",
  extraLight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
  black: "900",
} as const;

export const SHADOW = {
  light: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2, // 20% opacity
    shadowRadius: 1.41, // 1.41 * 2 = 2.82px blur radius
    elevation: 2, // Android shadow
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3, // 30% opacity
    shadowRadius: 3.84, // 3.84 * 2 = 7.68px blur radius
    elevation: 5, // Android shadow
  },
  heavy: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4, // 40% opacity
    shadowRadius: 5.84, // 5.84 * 2 = 11.68px blur radius
    elevation: 8, // Android shadow
  },
} as const;

export const ROOT: ViewStyle = {
  padding: SIZE.md,
} as const;

export const SURFACE: ViewStyle = {
  backgroundColor: COLORS.surface,
  borderRadius: SIZE.md,
  padding: SIZE.sm,
  marginHorizontal: SIZE.sm,
  marginVertical: SIZE.md,
  paddingHorizontal: SIZE.lg,
  paddingVertical: SIZE.md,
  borderColor: COLORS.primary,
  borderWidth: SIZE.xs,
  ...SHADOW.light,
} as const;

export const H1: TextStyle = {
  fontSize: FONT_SIZE.xxl,
  fontWeight: FONT_WEIGHT.bold,
  color: COLORS.text,
  marginBottom: SIZE.sm,
} as const;

export const H2: TextStyle = {
  fontSize: FONT_SIZE.xl,
  fontWeight: FONT_WEIGHT.semiBold,
  color: COLORS.text,
  marginBottom: SIZE.sm,
} as const;

export const H3: TextStyle = {
  fontSize: FONT_SIZE.lg,
  fontWeight: FONT_WEIGHT.medium,
  color: COLORS.text,
  marginBottom: SIZE.sm,
} as const;

export const H4: TextStyle = {
  fontSize: FONT_SIZE.md,
  fontWeight: FONT_WEIGHT.normal,
  color: COLORS.text,
  marginBottom: SIZE.sm,
} as const;

export const H5: TextStyle = {
  fontSize: FONT_SIZE.sm,
  fontWeight: FONT_WEIGHT.light,
  color: COLORS.text,
  marginBottom: SIZE.sm,
} as const;

export const H6: TextStyle = {
  fontSize: FONT_SIZE.xs,
  fontWeight: FONT_WEIGHT.thin,
  color: COLORS.text,
  marginBottom: SIZE.sm,
} as const;
