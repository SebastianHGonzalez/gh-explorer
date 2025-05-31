import { StyleSheet, TextStyle } from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";
import { ContainerType, useContainerStyle, useContainerStyleContext } from "./useContainerStyle";

export type TextAs = "p" | "h1" | "h2" | "h3" | "h4";

const font: Record<TextAs, (theme: MD3Theme) => TextStyle> = {
  h1: (theme) => theme.fonts.headlineLarge,
  h2: (theme) => theme.fonts.headlineMedium,
  h3: (theme) => theme.fonts.headlineSmall,
  h4: (theme) => theme.fonts.bodyLarge,
  p: (theme) => theme.fonts.bodyMedium,
};

const color: Record<ContainerType, (theme: MD3Theme) => TextStyle> = {
  primary: (theme) => ({ color: theme.colors.onPrimary }),
  primaryContainer: (theme) => ({ color: theme.colors.onPrimaryContainer }),
  secondary: (theme) => ({ color: theme.colors.onSecondary }),
  secondaryContainer: (theme) => ({   color: theme.colors.onSecondaryContainer, }),
  tertiary: (theme) => ({ color: theme.colors.onTertiary }),
  tertiaryContainer: (theme) => ({ color: theme.colors.onTertiaryContainer }),
  surface: (theme) => ({ color: theme.colors.onSurface }),
  surfaceVariant: (theme) => ({ color: theme.colors.onSurfaceVariant }),
  surfaceDisabled: (theme) => ({ color: theme.colors.onSurfaceDisabled }),
  error: (theme) => ({ color: theme.colors.onError }),
  errorContainer: (theme) => ({ color: theme.colors.onErrorContainer }),
  background: (theme) => ({ color: theme.colors.onBackground }),
};

export function useTextStyle(as: TextAs, onOverride?: ContainerType): TextStyle {
  const theme = useTheme();
  const on = useContainerStyleContext();

  return StyleSheet.flatten([font[as](theme), color[onOverride || on](theme)])
}
