import { AppRouteName } from "@/navigation/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";
import { ComponentProps } from "react";
import { useTheme } from "react-native-paper";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { GithubUserDescriptionScreen } from "./screens/GithubUserDescriptionScreen";
import { ListGithubUsersScreen } from "./screens/ListGithubUsersScreen";
import { SearchGithubUsersScreen } from "./screens/SearchGithubUsersScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { t } from "@/i18n/t";

function useStackOptions() {
  const theme = useTheme();

  return {
    screenOptions: {
      headerStyle: { backgroundColor: theme.colors.surface },
      headerTintColor: theme.colors.onSurface,
      contentStyle: { backgroundColor: theme.colors.surface },
    },
  } as const;
}

const ListStack = createNativeStackNavigator();
function ListStackScreen() {
  const props = useStackOptions();

  return (
    <ListStack.Navigator
      initialRouteName={AppRouteName.ListGithubUsersScreen}
      {...props}
    >
      <ListStack.Screen
        name={AppRouteName.ListGithubUsersScreen}
        component={ListGithubUsersScreen}
        options={{ title: t("ListGithubUsersScreen.title") }}
      />
      <ListStack.Screen
        name={AppRouteName.GithubUserDescriptionScreen}
        component={GithubUserDescriptionScreen as never}
        options={{ title: t("GithubUserDescriptionScreen.title") }}
      />
    </ListStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator();
function SearchStackScreen() {
  const props = useStackOptions();

  return (
    <SearchStack.Navigator
      initialRouteName={AppRouteName.SearchGithubUsersScreen}
      {...props}
    >
      <SearchStack.Screen
        name={AppRouteName.SearchGithubUsersScreen}
        component={SearchGithubUsersScreen}
        options={{ title: t("SearchGithubUsersScreen.title") }}
      />
      <SearchStack.Screen
        name={AppRouteName.GithubUserDescriptionScreen}
        component={GithubUserDescriptionScreen as never}
        options={{ title: t("GithubUserDescriptionScreen.title") }}
      />
    </SearchStack.Navigator>
  );
}

const FavoritesStack = createNativeStackNavigator();
function FavoritesStackScreen() {
  const props = useStackOptions();

  return (
    <FavoritesStack.Navigator
      initialRouteName={AppRouteName.FavoritesScreen}
      {...props}
    >
      <FavoritesStack.Screen
        name={AppRouteName.FavoritesScreen}
        component={FavoritesScreen}
        options={{ title: t("FavoritesScreen.title") }}
      />
      <FavoritesStack.Screen
        name={AppRouteName.GithubUserDescriptionScreen}
        component={GithubUserDescriptionScreen as never}
        options={{ title: t("GithubUserDescriptionScreen.title") }}
      />
    </FavoritesStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabsStack() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={AppRouteName.ListGithubUsersScreen}
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.onSurface,
        sceneStyle: { backgroundColor: theme.colors.surface },
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurface,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.onSurface,
        },
        tabBarLabelStyle: theme.fonts.labelSmall,
        animation: "shift",
        transitionSpec: {
          animation: "timing",
          config: {
            duration: 100,
          },
        },
      }}
    >
      <Tab.Screen
        name={AppRouteName.ListGithubUsersScreen}
        component={ListStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: t("ListStackScreen.tab"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={AppRouteName.SearchGithubUsersScreen}
        component={SearchStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: t("SearchStackScreen.tab"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={AppRouteName.FavoritesScreen}
        component={FavoritesStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: t("FavoritesStackScreen.tab"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
export function RootStack() {
  const props = useStackOptions();

  return (
    <Stack.Navigator
      initialRouteName={AppRouteName.Tabs}
      {...props}
      screenOptions={{
        ...props.screenOptions,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={AppRouteName.Tabs}
        component={TabsStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const linking = {
  prefixes: ["gh-explorer://"],
  config: {
    screens: {
      [AppRouteName.Tabs]: {
        path: "",
        screens: {
          [AppRouteName.ListGithubUsersScreen]: {
            path: "",
            screens: {
              [AppRouteName.ListGithubUsersScreen]: "",
              [AppRouteName.GithubUserDescriptionScreen]: "users/:login",
            },
          },
          [AppRouteName.SearchGithubUsersScreen]: {
            path: "search",
            screens: {
              [AppRouteName.SearchGithubUsersScreen]: "",
              [AppRouteName.GithubUserDescriptionScreen]: "users/:login",
            },
          },
          [AppRouteName.FavoritesScreen]: {
            path: "favorites",
            screens: {
              [AppRouteName.FavoritesScreen]: "",
              [AppRouteName.GithubUserDescriptionScreen]: "users/:login",
            },
          },
        },
      },
    },
  },
};

export function AppNavigationContainer(
  props: ComponentProps<typeof NavigationContainer>,
) {
  return <NavigationContainer linking={linking} {...props} />;
}
