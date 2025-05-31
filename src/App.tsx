import { Roboto_400Regular, Roboto_600SemiBold, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { Assets as NavigationAssets } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import React from 'react';
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import QueryClientProvider from "./components/query/QueryClientProvider";
import { RootStack } from './navigation';
import { FONT_WEIGHT } from './styles/constants';

Asset.loadAsync([
  ...NavigationAssets,
]);

preventAutoHideAsync();

export function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_600SemiBold,
    Roboto_700Bold,
  });

  const colorScheme = useColorScheme();

  if (!fontsLoaded) {
    return null;
  }

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: colors.dark, fonts }
      : { ...MD3LightTheme, colors: colors.light, fonts };

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <QueryClientProvider>
            <NavigationContainer
              linking={{
                prefixes: [
                  // Change the scheme to match your app's scheme defined in app.json
                  'helloworld://',
                ],
              }}
              onReady={() => {
                hideAsync();
              }}>
              <RootStack />
            </NavigationContainer>
          </QueryClientProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const fonts = {
  ...MD3LightTheme.fonts,
  displayLarge: { ...MD3LightTheme.fonts.displayLarge, fontWeight: FONT_WEIGHT.heavy },
  displayMedium: { ...MD3LightTheme.fonts.displayMedium, fontWeight: FONT_WEIGHT.medium },
  displaySmall: { ...MD3LightTheme.fonts.displaySmall, fontWeight: FONT_WEIGHT.light },
  headlineLarge: { ...MD3LightTheme.fonts.headlineLarge, fontWeight: FONT_WEIGHT.heavy },
  headlineMedium: { ...MD3LightTheme.fonts.headlineMedium, fontWeight: FONT_WEIGHT.medium },
  headlineSmall: { ...MD3LightTheme.fonts.headlineSmall, fontWeight: FONT_WEIGHT.light },
  titleLarge: { ...MD3LightTheme.fonts.titleLarge, fontWeight: FONT_WEIGHT.heavy },
  titleMedium: { ...MD3LightTheme.fonts.titleMedium, fontWeight: FONT_WEIGHT.medium },
  titleSmall: { ...MD3LightTheme.fonts.titleSmall, fontWeight: FONT_WEIGHT.light },
  labelLarge: { ...MD3LightTheme.fonts.labelLarge, fontWeight: FONT_WEIGHT.heavy },
  labelMedium: { ...MD3LightTheme.fonts.labelMedium, fontWeight: FONT_WEIGHT.medium },
  labelSmall: { ...MD3LightTheme.fonts.labelSmall, fontWeight: FONT_WEIGHT.light },
  bodyLarge: { ...MD3LightTheme.fonts.bodyLarge, fontWeight: FONT_WEIGHT.heavy },
  bodyMedium: { ...MD3LightTheme.fonts.bodyMedium, fontWeight: FONT_WEIGHT.medium },
  bodySmall: { ...MD3LightTheme.fonts.bodySmall, fontWeight: FONT_WEIGHT.light },
}

const colors = {
  light: {
    primary: "rgb(140, 51, 179)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(248, 216, 255)",
    onPrimaryContainer: "rgb(50, 0, 71)",
    secondary: "rgb(105, 89, 109)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(241, 220, 244)",
    onSecondaryContainer: "rgb(35, 23, 40)",
    tertiary: "rgb(129, 82, 80)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 218, 216)",
    onTertiaryContainer: "rgb(51, 17, 17)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(30, 27, 30)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(30, 27, 30)",
    surfaceVariant: "rgb(235, 223, 233)",
    onSurfaceVariant: "rgb(76, 68, 77)",
    outline: "rgb(125, 116, 125)",
    outlineVariant: "rgb(206, 195, 205)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(51, 47, 51)",
    inverseOnSurface: "rgb(246, 239, 243)",
    inversePrimary: "rgb(235, 178, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(249, 241, 251)",
      level2: "rgb(246, 235, 249)",
      level3: "rgb(242, 229, 247)",
      level4: "rgb(241, 227, 246)",
      level5: "rgb(239, 223, 244)",
    },
    surfaceDisabled: "rgba(30, 27, 30, 0.12)",
    onSurfaceDisabled: "rgba(30, 27, 30, 0.38)",
    backdrop: "rgba(53, 46, 54, 0.4)",


    card: "rgb(255, 251, 255)",
    text: "rgb(30, 27, 30)",
    border: "rgb(30, 27, 30)",
    notification: "rgb(186, 26, 26)",
  },
  dark: {
    primary: "rgb(235, 178, 255)",
    onPrimary: "rgb(82, 0, 113)",
    primaryContainer: "rgb(114, 17, 153)",
    onPrimaryContainer: "rgb(248, 216, 255)",
    secondary: "rgb(212, 192, 215)",
    onSecondary: "rgb(57, 44, 61)",
    secondaryContainer: "rgb(80, 66, 85)",
    onSecondaryContainer: "rgb(241, 220, 244)",
    tertiary: "rgb(245, 183, 181)",
    onTertiary: "rgb(76, 37, 36)",
    tertiaryContainer: "rgb(102, 59, 57)",
    onTertiaryContainer: "rgb(255, 218, 216)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(30, 27, 30)",
    onBackground: "rgb(232, 224, 229)",
    surface: "rgb(30, 27, 30)",
    onSurface: "rgb(232, 224, 229)",
    surfaceVariant: "rgb(76, 68, 77)",
    onSurfaceVariant: "rgb(206, 195, 205)",
    outline: "rgb(151, 142, 151)",
    outlineVariant: "rgb(76, 68, 77)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(232, 224, 229)",
    inverseOnSurface: "rgb(51, 47, 51)",
    inversePrimary: "rgb(140, 51, 179)",
    elevation: {
      level0: "transparent",
      level1: "rgb(40, 35, 41)",
      level2: "rgb(46, 39, 48)",
      level3: "rgb(53, 44, 55)",
      level4: "rgb(55, 45, 57)",
      level5: "rgb(59, 48, 62)",
    },
    surfaceDisabled: "rgba(232, 224, 229, 0.12)",
    onSurfaceDisabled: "rgba(232, 224, 229, 0.38)",
    backdrop: "rgba(53, 46, 54, 0.4)",


    card: "rgb(30, 27, 30)",
    text: "rgb(232, 224, 229)",
    border: "rgb(232, 224, 229)",
    notification: "rgb(255, 180, 171)",
  },
};
