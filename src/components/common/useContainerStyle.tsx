import { SIZE } from "@/styles/constants";
import { createContext, PropsWithChildren, use } from "react";
import { ViewStyle } from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";

export type Elevation =  0 | 1 | 2 | 3 | 4 | 5;

export type ContainerType =
  | "primary"
  | "primaryContainer"
  | "secondary"
  | "secondaryContainer"
  | "tertiary"
  | "tertiaryContainer"
  | "surface"
  | "surfaceVariant"
  | "surfaceDisabled"
  | "error"
  | "errorContainer"
  | "background";


const containerStyleContext = createContext<ContainerType>('surface')

const baseContainer = (theme: MD3Theme, elevation?: Elevation): ViewStyle => ({
  elevation,
  borderRadius: theme.roundness,
  borderWidth: SIZE.xxs,
  padding: SIZE.sm,
  marginHorizontal: SIZE.sm,
  marginVertical: SIZE.md,
  paddingHorizontal: SIZE.lg,
  paddingVertical: SIZE.md,
})

const style: Record<ContainerType, (theme: MD3Theme, elevation?: Elevation) => ViewStyle> = {
  primary: (theme, elevation) => ({ ...baseContainer(theme, elevation), backgroundColor: theme.colors.primary, borderColor: theme.colors.onPrimary }),
  primaryContainer: (theme, elevation) => ({ ...baseContainer(theme, elevation), backgroundColor: theme.colors.primaryContainer, borderColor: theme.colors.onPrimaryContainer }),
  secondary: (theme, elevation) => ({ ...baseContainer(theme, elevation), backgroundColor: theme.colors.secondary, borderColor: theme.colors.onSecondary }),
  secondaryContainer: (theme, elevation) => ({ ...baseContainer(theme, elevation), backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.onSecondaryContainer, }),
  tertiary: (theme, elevation) => ({ ...baseContainer(theme, elevation), backgroundColor: theme.colors.tertiary, borderColor: theme.colors.onTertiary }),
  tertiaryContainer: (theme, elevation) => ({ ...baseContainer(theme, elevation), backgroundColor: theme.colors.tertiaryContainer, borderColor: theme.colors.onTertiaryContainer }),
  surface: (theme, elevation) => ({ ...baseContainer(theme, elevation), backgroundColor: theme.colors.surface, borderColor: theme.colors.onSurface }),
  surfaceVariant: (theme, elevation) => ({ ...baseContainer(theme, elevation), backgroundColor: theme.colors.surfaceVariant, borderColor: theme.colors.onSurfaceVariant }),
  surfaceDisabled: (theme, elevation) => ({ ...baseContainer(theme, elevation), backgroundColor: theme.colors.surfaceDisabled, borderColor: theme.colors.onSurfaceDisabled }),
  error: (theme, elevation) => ({ ...baseContainer(theme, elevation), backgroundColor: theme.colors.error, borderColor: theme.colors.onError }),
  errorContainer: (theme, elevation) => ({ ...baseContainer(theme, elevation), backgroundColor: theme.colors.errorContainer, borderColor: theme.colors.onErrorContainer }),
  background: (theme, elevation) => ({ ...baseContainer(theme, elevation), backgroundColor: theme.colors.background, borderColor: theme.colors.onBackground }),
};

export function useContainerStyle(type: ContainerType = 'background', elevation?: Elevation): ViewStyle {
  const theme = useTheme();
  return style[type](theme, elevation);
}

interface ContainerStyleProviderProps {
  type: ContainerType
}

export function ContainerStyleProvider({ type, children }: PropsWithChildren<ContainerStyleProviderProps>) {
  return (
    <containerStyleContext.Provider value={type}>{children}</containerStyleContext.Provider>
  )
}

export function useContainerStyleContext() {
  return use(containerStyleContext);
}
